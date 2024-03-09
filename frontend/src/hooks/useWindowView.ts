/** @format */

import { useCallback, useEffect, useState } from 'react';

export function useWindowView() {
  const [size, setSize] = useState([0, 0]);

  const updateSize = useCallback(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return { width: size[0], height: size[1] };
}
