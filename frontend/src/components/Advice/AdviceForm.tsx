/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useCallback, useLayoutEffect, useRef } from 'react';

export default function AdviceForm() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEnter = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }, []);

  function adjustHeight() {
    if (textRef.current) {
      textRef.current.style.height = 'inherit';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }

  useLayoutEffect(() => {
    adjustHeight();
  }, []);

  return (
    <AdviceFormStyled onKeyDown={handleEnter} ref={formRef}>
      <InnerLayout>
        <label className='input-sizer stacked'>
          <span>Ask advice: </span>
          <textarea
            ref={textRef}
            rows={1}
            placeholder='Ask something here'
            onChange={() => adjustHeight()}
            onKeyDown={() => adjustHeight()}
          />
        </label>
      </InnerLayout>
    </AdviceFormStyled>
  );
}

const AdviceFormStyled = styled.form`
  .input-sizer {
    width: 100%;
    display: inline-grid;
    vertical-align: bottom;
    align-items: center;
    position: relative;
    border: solid 1px;
    padding: 1rem;
    margin: 5px;
    background: #fcf6f9;
    border-radius: 20px;
    border: 2px solid #fff;

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }

    &.stacked {
      padding: 0.5em;
      align-items: stretch;

      &::after,
      input,
      textarea {
        grid-area: 2 / 1;
      }
    }

    &::after,
    input,
    textarea {
      width: auto;
      min-width: 1em;
      grid-area: 1 / 2;
      font: inherit;
      padding: 0.25em;
      margin: 0;
      resize: none;
      background: none;
      appearance: none;
      border: none;
    }

    span {
      padding: 0.25em;
      color: #f56692;
    }

    &::after {
      content: attr(data-value) ' ';
      visibility: hidden;
      white-space: pre-wrap;
    }

    &:focus-within {
      outline: solid 1px rgba (0, 0, 0, 0.06);
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

      textarea:focus,
      input:focus {
        outline: none;
      }
    }
  }

  .input-sizer {
    > span {
      text-transform: uppercase;
      font-size: 0.8em;
      font-weight: bold;
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
    }
  }
`;
