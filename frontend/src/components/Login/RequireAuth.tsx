/** @format */

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ReactNode, useEffect } from 'react'; // Import ReactNode type

export default function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login', { replace: true });
    }
  }, [auth, navigate]);

  return <>{children}</>;
}
