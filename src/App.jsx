import { memo } from 'react';
import RestaurantLogin from './components/login-components/index';

const App = () => {
  return (
    <div>
      <RestaurantLogin/>
    </div>
  );
};

export default memo(App);