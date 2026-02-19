import { useState, useRef, useCallback, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// DEPTH STAGE MANAGER — Core 3D layer transition engine
//
// Architecture:
//   - Outer: perspective container (perspective: 1400px)
//   - Inner: preserve-3d space
//   - Each step: absolute positioned layer
//   - State machine: idle | exiting-forward | exiting-backward
//   - translateZ / scale / opacity / blur transitions
//   - 600ms cubic-bezier(0.22,1,0.36,1) easing
// ─────────────────────────────────────────────────────────────

const TRANSITION_MS = 620;

// Layer transform states
function getLayerStyle(status, isExiting, direction) {
  const base = {
    position:   "absolute",
    inset:      0,
    willChange: "transform, opacity, filter",
    transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1),
                 opacity   ${TRANSITION_MS - 60}ms cubic-bezier(0.22,1,0.36,1),
                 filter    ${TRANSITION_MS - 80}ms cubic-bezier(0.22,1,0.36,1)`,
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
  };

  if (status === "current") {
    return {
      ...base,
      transform:  "translateZ(0) scale(1)",
      opacity:    1,
      filter:     "blur(0px)",
      pointerEvents: "auto",
      zIndex:     2,
    };
  }

  if (status === "entering-forward") {
    return {
      ...base,
      transform:  "translateZ(160px) scale(1.04)",
      opacity:    0,
      filter:     "blur(6px)",
      pointerEvents: "none",
      zIndex:     3,
    };
  }

  if (status === "exiting-forward") {
    return {
      ...base,
      transform:  "translateZ(-100px) scale(0.95)",
      opacity:    0,
      filter:     "blur(4px)",
      pointerEvents: "none",
      zIndex:     1,
    };
  }

  if (status === "entering-backward") {
    return {
      ...base,
      transform:  "translateZ(-160px) scale(0.94)",
      opacity:    0,
      filter:     "blur(6px)",
      pointerEvents: "none",
      zIndex:     3,
    };
  }

  if (status === "exiting-backward") {
    return {
      ...base,
      transform:  "translateZ(100px) scale(1.05)",
      opacity:    0,
      filter:     "blur(4px)",
      pointerEvents: "none",
      zIndex:     1,
    };
  }

  // hidden
  return {
    ...base,
    transform:     "translateZ(-200px) scale(0.9)",
    opacity:       0,
    filter:        "blur(8px)",
    pointerEvents: "none",
    zIndex:        0,
    visibility:    "hidden",
  };
}

// ─────────────────────────────────────────────────────────────
// Hook: manages depth transition state
// ─────────────────────────────────────────────────────────────

export function useDepthTransition(totalSteps) {
  const [currentStep,   setCurrentStep]   = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction,     setDirection]     = useState("forward"); // forward | backward
  const [prevStep,      setPrevStep]      = useState(null);
  const timerRef = useRef(null);

  const navigate = useCallback((targetStep) => {
    if (transitioning || targetStep === currentStep) return;
    if (targetStep < 0 || targetStep >= totalSteps) return;

    const dir = targetStep > currentStep ? "forward" : "backward";
    setDirection(dir);
    setPrevStep(currentStep);
    setTransitioning(true);

    // After transition completes, clean up
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrentStep(targetStep);
      setPrevStep(null);
      setTransitioning(false);
    }, TRANSITION_MS);

    // Immediately update the target (starts transition)
    setCurrentStep(targetStep);
  }, [transitioning, currentStep, totalSteps]);

  const goForward  = useCallback(() => navigate(currentStep + 1), [navigate, currentStep]);
  const goBackward = useCallback(() => navigate(currentStep - 1), [navigate, currentStep]);
  const goTo       = useCallback((s) => navigate(s), [navigate]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return {
    currentStep,
    prevStep,
    direction,
    transitioning,
    goForward,
    goBackward,
    goTo,
  };
}

// ─────────────────────────────────────────────────────────────
// DepthStageManager: renders a perspective wrapper + layers
// ─────────────────────────────────────────────────────────────

export function DepthStageManager({
  steps,           // array of { key, component }
  currentStep,
  prevStep,
  direction,
  transitioning,
  style,
}) {
  return (
    <div
      aria-live="polite"
      style={{
        position:        "relative",
        width:           "100%",
        flex:            1,
        display:         "flex",
        flexDirection:   "column",
        // 3D perspective container
        perspective:     "1400px",
        perspectiveOrigin: "50% 44%",
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

          if (idx === currentStep && !transitioning) {
            status = "current";
          } else if (idx === currentStep && transitioning) {
            // Entering
            status = direction === "forward" ? "entering-forward" : "entering-backward";
          } else if (idx === prevStep && transitioning) {
            // Exiting
            status = direction === "forward" ? "exiting-forward" : "exiting-backward";
          }

          const isVisible = status !== "hidden";

          return (
            <div
              key={step.key}
              role="tabpanel"
              aria-label={`Step ${idx + 1}`}
              aria-hidden={status === "hidden"}
              style={getLayerStyle(status)}
            >
              {/* Only render if ever been visible — performance optimization */}
              {(isVisible || idx <= currentStep) && step.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
