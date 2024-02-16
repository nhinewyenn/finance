/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function RequireAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  return <div>RequireAuth</div>;
}
