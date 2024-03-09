/** @format */

import { useCallback } from 'react';

function useSubmitOnEnter(formRef: React.RefObject<HTMLFormElement>) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    },
    [formRef]
  );
  return handleKeyDown;
}

export default useSubmitOnEnter;
