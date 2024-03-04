/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../store/userAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [registerUser, { isError }] = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerUser({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }).unwrap();
      toast.success('Sign up success!');
      setTimeout(() => navigate('/login'), 500);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { status?: number; data?: { message?: string } };
        return isError && toast.error(err.data?.message);
      }
    }
  }

  return (
    <LoginStyled onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
      <Button
        name={'Submit'}
        bPad={'.8rem 1.6rem'}
        bRadius={'30px'}
        bg={'var(--color-accent'}
        color={'#fff'}
      />
      <ToastContainer />
      <hr />
      <p>Have an account?</p>
      <Link to='/login' style={{ textDecoration: 'none' }}>
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
