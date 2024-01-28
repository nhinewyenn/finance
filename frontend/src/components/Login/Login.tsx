/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/userAPI';
import { ToastContainer, toast } from 'react-toastify';

type LoginProps = {
  setToken: (token: string) => void;
};

export default function Login({ setToken }: LoginProps) {
  const [login, { isError }] = useLoginMutation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    _id: '',
    username: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(user).unwrap();
      toast.success('Login success!');
      setUser({
        _id: '',
        username: '',
        password: '',
      });
      setTimeout(() => navigate('/'), 700);
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
        placeholder='username'
        required
        value={user.username}
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />
      <input
        type='password'
        name='password'
        id='password'
        placeholder='password'
        required
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
        value={user.password}
      />
      <Button
        name={'Submit'}
        bPad={'.8rem 1.6rem'}
        bRadius={'30px'}
        bg={'var(--color-accent'}
        color={'#fff'}
      />
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