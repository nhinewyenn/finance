/** @format */

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
