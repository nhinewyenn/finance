/** @format */

import { useCallback } from 'react';

function useSubmitOnEnter(
  formRef: React.MutableRefObject<HTMLFormElement | null>
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.code === 'Enter' && !e.shiftKey && formRef.current) {
        e.preventDefault();
        formRef.current?.dispatchEvent(new Event('submit'));
      }
    },
    [formRef]
  );
  return handleKeyDown;
}

export default useSubmitOnEnter;
