import { memo }          from 'react';
import { Routes, Route }  from 'react-router-dom';
import RestaurantLogin    from './components/login-components/index';
import Register           from './components/register-components/index';

const App = () => {
  return (
    <Routes>
      <Route path="/"         element={<RestaurantLogin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default memo(App);
