/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('submit');
  }

  return (
    <LoginStyled onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type='text'
        name='username'
        id='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username'
        required
      />
      <input
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
        required
      />
      <Button
        name={'Submit'}
        bPad={'.8rem 1.6rem'}
        bRadius={'30px'}
        bg={'var(--color-accent'}
        color={'#fff'}
      />
      <hr />
      <p>Have an account?</p>
      <Link to='' style={{ textDecoration: 'none' }}>
        Log In
      </Link>
    </LoginStyled>
  );
}

const LoginStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 50%;
  margin: 12% auto;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url('/frontend/src/img/bg.png');

  input {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
