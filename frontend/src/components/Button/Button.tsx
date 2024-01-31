/** @format */

import { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  name?: string;
  color: string;
  bg: string;
  bPad: string;
  bRadius: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
};

export default function Button({
  name,
  color,
  bg,
  icon,
  bPad,
  bRadius,
  onClick,
  className,
}: ButtonProps) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRadius,
        color: color,
      }}
      onClick={onClick}
      className={className}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;
