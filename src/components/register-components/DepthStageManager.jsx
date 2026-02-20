import { useState, useRef, useCallback, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// DEPTH STAGE MANAGER — Core 3D layer transition engine (v3)
//
// BUG FIXES from v2:
//   - setCurrentStep(targetStep) was called IMMEDIATELY in navigate(),
//     causing currentStep to jump to the target before the transition
//     completed. This broke:
//       1. The entering layer's `ready` prop (became true while layer
//          was still at opacity:0 in entering-forward state)
//       2. The status logic (currentStep = target AND transitioning = true
//          meant exiting layer lost its prevStep reference correctly but
//          the entering layer's `ready` fired content animations too early)
//
//   FIX: Added `nextStep` state. currentStep only updates AFTER the
//   600ms transition completes. During transition:
//     - currentStep = OLD step (exiting)
//     - nextStep    = NEW step (entering)
//   This keeps `ready` props correct: entering step has ready=false
//   during entry animation, then ready=true when it becomes current.
//
// GPU OPTIMIZATIONS (unchanged from v2):
//   - translateZ(0) on perspective wrapper promotes GPU layer
//   - filter:blur() removed from transitions (main-thread cost)
//   - Opacity + transform only — no layout properties
//   - Style objects defined outside component — zero allocation per render
//   - transition property order: transform → opacity (correct compositing)
//   - backfaceVisibility: hidden on all layers
// ─────────────────────────────────────────────────────────────

const TRANSITION_MS = 600;

// ── Static base — defined outside component, never recreated
const LAYER_BASE = {
  position:                 "absolute",
  inset:                    0,
  willChange:               "transform, opacity",
  backfaceVisibility:       "hidden",
  WebkitBackfaceVisibility: "hidden",
  transition: [
    `transform ${TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1)`,
    `opacity   ${TRANSITION_MS - 60}ms cubic-bezier(0.22,1,0.36,1)`,
  ].join(", "),
  transformStyle: "preserve-3d",
};

// ── Layer states — pre-defined, zero allocation per render
const LAYER_STYLES = {
  current: {
    ...LAYER_BASE,
    transform:     "translateZ(0) scale(1)",
    opacity:       1,
    pointerEvents: "auto",
    zIndex:        2,
  },
  "entering-forward": {
    ...LAYER_BASE,
    transform:     "translateZ(160px) scale(1.04)",
    opacity:       0,
    pointerEvents: "none",
    zIndex:        3,
  },
  "exiting-forward": {
    ...LAYER_BASE,
    transform:     "translateZ(-100px) scale(0.95)",
    opacity:       0,
    pointerEvents: "none",
    zIndex:        1,
  },
  "entering-backward": {
    ...LAYER_BASE,
    transform:     "translateZ(-160px) scale(0.94)",
    opacity:       0,
    pointerEvents: "none",
    zIndex:        3,
  },
  "exiting-backward": {
    ...LAYER_BASE,
    transform:     "translateZ(100px) scale(1.05)",
    opacity:       0,
    pointerEvents: "none",
    zIndex:        1,
  },
  hidden: {
    ...LAYER_BASE,
    transform:     "translateZ(-200px) scale(0.9)",
    opacity:       0,
    pointerEvents: "none",
    zIndex:        0,
    visibility:    "hidden",
  },
};

// ─────────────────────────────────────────────────────────────
// useDepthTransition — manages step navigation state
// ─────────────────────────────────────────────────────────────

export function useDepthTransition(totalSteps) {
  const [currentStep,   setCurrentStep]   = useState(0);
  const [nextStep,      setNextStep]      = useState(null);   // ← NEW: target during transition
  const [transitioning, setTransitioning] = useState(false);
  const [direction,     setDirection]     = useState("forward");
  const timerRef = useRef(null);

  const navigate = useCallback((targetStep) => {
    if (transitioning)              return;   // block during active transition
    if (targetStep === currentStep) return;   // already here
    if (targetStep < 0 || targetStep >= totalSteps) return;

    const dir = targetStep > currentStep ? "forward" : "backward";
    setDirection(dir);
    setNextStep(targetStep);      // ← mark target (entering layer)
    setTransitioning(true);
    // currentStep stays as OLD step until transition completes ↓

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrentStep(targetStep); // ← NOW update to target
      setNextStep(null);
      setTransitioning(false);
    }, TRANSITION_MS);
  }, [transitioning, currentStep, totalSteps]);

  const goForward  = useCallback(() => navigate(currentStep + 1), [navigate, currentStep]);
  const goBackward = useCallback(() => navigate(currentStep - 1), [navigate, currentStep]);
  const goTo       = useCallback((s) => navigate(s),              [navigate]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Expose nextStep so DepthStageManager can correctly identify entering layer
  return { currentStep, nextStep, direction, transitioning, goForward, goBackward, goTo };
}

// ─────────────────────────────────────────────────────────────
// DepthStageManager — renders perspective container + layers
// ─────────────────────────────────────────────────────────────

export function DepthStageManager({
  steps,
  currentStep,
  nextStep,      // ← NEW prop: the step currently entering
  direction,
  transitioning,
  style,
}) {
  return (
    <div
      aria-live="polite"
      style={{
        position:          "relative",
        width:             "100%",
        flex:              1,
        display:           "flex",
        flexDirection:     "column",
        perspective:       "1400px",
        perspectiveOrigin: "50% 44%",
        transform:         "translateZ(0)",   // GPU layer promotion
        willChange:        "transform",
        ...style,
      }}
    >
      <div
        style={{
          position:      "relative",
          flex:          1,
          transformStyle:"preserve-3d",
        }}
      >
        {steps.map((step, idx) => {
          let status = "hidden";

          if (!transitioning && idx === currentStep) {
            // Steady state — this step is active
            status = "current";
          } else if (transitioning && idx === nextStep) {
            // This step is coming IN
            status = direction === "forward" ? "entering-forward" : "entering-backward";
          } else if (transitioning && idx === currentStep) {
            // This step is going OUT
            status = direction === "forward" ? "exiting-forward" : "exiting-backward";
          }

          // Render content if visible OR previously visited (avoids remounting)
          const shouldRenderContent = status !== "hidden" || idx < currentStep;

          return (
            <div
              key={step.key}
              role="tabpanel"
              aria-label={`Step ${idx + 1}`}
              aria-hidden={status === "hidden" || status.startsWith("entering")}
              style={LAYER_STYLES[status]}
            >
              {shouldRenderContent && step.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
