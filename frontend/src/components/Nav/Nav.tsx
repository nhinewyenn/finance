/** @format */

import styled from 'styled-components';
import avatar from '../../img/blank-avatar-photo-place-holder-600nw-1114445501.webp';
import { signOut } from '../../utils/Icon';
import { menuItems } from '../../utils/menuItems';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserByIdQuery,
  useLogoutUserMutation,
} from '../../store/userAPI';
import Button from '../Button/Button';
import { logoutUser } from '../../store/authSlice';
import { useGetUserId } from '../../utils/formUtils';
import { useDispatch } from 'react-redux';

type NavProps = {
  active: number;
  setActive: (id: number) => void;
};

export default function Nav({ active, setActive }: NavProps) {
  const userId = useGetUserId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutation, { isSuccess: logoutSuccess }] =
    useLogoutUserMutation();
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(userId!);

  async function logout(event: React.FormEvent) {
    event.preventDefault();
    try {
      await logoutMutation().unwrap();
      dispatch(logoutUser());
      window.location.reload();
      logoutSuccess && navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <NavStyled>
      <div className='user-container'>
        <img src={avatar} alt='User icon image' />
        <div className='text'>
          {isLoading && <h3>Loading user...</h3>}
          {isSuccess && <h3 key={data.user._id}>{data.user.username}</h3>}
          <p>Overview</p>
        </div>
      </div>

      <ul className='menu-items'>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={active === item.id ? 'active' : ''}
            onClick={() => setActive(item.id)}
          >
            {item.icon}
            <span className='menu-title'>{item.title}</span>
          </li>
        ))}
      </ul>

      <form className='submit-btn' onSubmit={logout}>
        <Button
          icon={signOut}
          name={'Sign Out'}
          bPad={'.8rem 1.6rem'}
          bRadius={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </form>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.25rem;
  width: 350px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
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

  @media (max-width: 1350px) {
    width: 315px;
    .user-container {
      h3 {
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 1270px) {
    width: 100px;

    .menu-title {
      display: none;
    }

    .user-container {
      flex-direction: column;

      img {
        width: 50px;
        height: 50px;
      }

      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3,
        p {
          font-size: 12px;
        }
      }
    }

    .submit-btn {
      button {
        padding: 0.8rem 1rem !important;
        span {
          display: none;
        }
      }
    }

    @media (max-width: 700px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      height: 12%;
      padding: 2rem 1.25rem;
      gap: 1rem;

      .menu-items {
        flex: 0;
        flex-direction: row;
        gap: 0.5rem;
      }

      .active {
        &::before {
          display: none;
        }
      }

      .submit-btn {
        button {
          padding: 0.75rem !important;
        }
      }

      .user-container {
        flex-direction: row;
        height: 0;
        gap: 0;

        img {
          width: 45px;
          height: 45px;
        }

        .text {
          p,
          h3 {
            display: none;
          }
        }
      }
    }

    @media (max-width: 500px) {
      justify-content: center;
      gap: 0rem;

      .submit-btn {
        button {
          padding: 0.5rem !important;
        }
      }

      .user-container {
        img {
          width: 35px;
          height: 35px;
        }
      }

      .menu-items {
        gap: 0rem;

        li {
          i {
            font-size: 1.25rem;
          }
        }
      }
    }
  }
`;
