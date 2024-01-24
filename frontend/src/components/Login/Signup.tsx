/** @format */

import styled from 'styled-components';
import Button from '../Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/userAPI';

export default function SignUp() {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    password: '',
  });
  // const [register, setRegister] = useState(false);
  const [registerUser] = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerUser(user).unwrap();
      setUser({
        _id: '',
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error with registering user:', error);
    }
  }

  console.log(user.username);
  console.log(user.password);

  return (
    <LoginStyled onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type='text'
        name='username'
        id='username'
        value={user.username}
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
        placeholder='username'
        required
      />
      <input
        type='password'
        name='password'
        id='password'
        value={user.password}
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
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
