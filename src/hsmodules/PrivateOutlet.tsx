import { useContext } from 'react';

import { UserContext } from '../context/context';
import Dashboard from '../pages/Dashboard';

const PrivateOutlet = () => {
  // const { user } = useContext(UserContext);
  const user = true;
  return user ? <Dashboard /> : <div>Access Denied</div>;
};

export default PrivateOutlet;
