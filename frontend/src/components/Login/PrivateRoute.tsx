/** @format */

import React from 'react';
import { useLocation } from 'react-router';

export default function PrivateRoute() {
  const location = useLocation();

  return <div>PrivateRoute</div>;
}
