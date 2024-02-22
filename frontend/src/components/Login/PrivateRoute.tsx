/** @format */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);
  return user ? <Outlet /> : <Navigate to='/login' replace={true} />;
};
export default PrivateRoute;
