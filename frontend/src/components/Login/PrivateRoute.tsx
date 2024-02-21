/** @format */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  console.log(userInfo);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
