/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/userAPI';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

export default function Login() {
  const [login, { isError }] = useLoginMutation();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(['access_token']); //eslint-disable-line
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const loginData = await login({
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }).unwrap();

    try {
      setCookies('access_token', loginData.token);
      localStorage.setItem('userID', loginData.userID);
      localStorage.setItem('access_token', loginData.token);
      toast.success('Login success!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      isError && toast.error('Info does not match!');
      console.error('Error with logging in:', error);
    }
  }

  return (
    <LoginStyled onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type='text'
        name='username'
        id='username'
        ref={usernameRef}
        placeholder='username'
        required
      />
      <input
        type='password'
        name='password'
        id='password'
        ref={passwordRef}
        placeholder='password'
        required
      />
      <div className='submit-btn'>
        <Button
          name={'Submit'}
          bPad={'.8rem 1.6rem'}
          bRadius={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
      <ToastContainer />
      <hr />
      <p>Don't have an account?</p>
      <Link to='/register' style={{ textDecoration: 'none' }}>
        Sign up
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
