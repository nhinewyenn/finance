/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../store/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCredentials } from '../../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Login() {
  const [login, { isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const loginData = await login({
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    }).unwrap();

    try {
      toast.success('Login success!');
      localStorage.setItem('userID', loginData.userID);
      dispatch(setCredentials({ ...loginData }));
      setTimeout(() => navigate('/'), 500);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { status?: number; data?: { message?: string } };
        return isError && toast.error(err.data?.message);
      }
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
      <button
        className='demo'
        onClick={() =>
          alert(
            'username: blackpink1234, password: blackpink1234 \n username: testuser1234, password: testuser1234'
          )
        }
      >
        <a>Demo</a>
      </button>
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

  .demo {
    border: none;
    background: none;
    color: #222260;
    font-family: inherit;
    font-size: inherit;
    margin: none;
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
