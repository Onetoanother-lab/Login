import { memo } from 'react';
import RestaurantLogin from './components/RestaurantLogin_Redesigned';

const App = () => {
  return (
    <div>
      <RestaurantLogin/>
    </div>
  );
};

export default memo(App);