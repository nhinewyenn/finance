/** @format */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function PrivateRoute() {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to='/login' replace={true} />;
}
