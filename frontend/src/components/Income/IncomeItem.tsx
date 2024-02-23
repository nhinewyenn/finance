/** @format */

import styled from 'styled-components';
import {
  book,
  calendar,
  card,
  circle,
  clothing,
  comment,
  dollar,
  edit,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from '../../utils/Icon';
import Button from '../Button/Button';
import { dateFormat } from '../../utils/formUtils';

type IncomeItemProps = {
  id: string;
  amount: number;
  date: Date;
  category: string;
  title: string;
  description: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  onToggle: () => void;
  type: 'income' | 'expense';
};

export default function IncomeItem({
  title,
  id,
  amount,
  date,
  category,
  description,
  onDelete,
  onUpdate,
  onToggle,
  type,
}: IncomeItemProps) {
  function incomeCategoryIcon() {
    switch (category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'bank':
        return card;
      case 'online':
        return yt;
      case 'other':
        return piggy;
      default:
        return '';
    }
  }

  function expenseCategoryIcon() {
    switch (category) {
      case 'education':
        return book;
      case 'groceries':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'clothing':
        return clothing;
      case 'travel':
        return freelance;
      case 'other':
        return circle;
      default:
        return '';
    }
  }

  return (
    <IncomeItemStyled type={type}>
      <div className='icon'>
        {type === 'expense' ? expenseCategoryIcon() : incomeCategoryIcon()}
      </div>
      <div className='content'>
        <h5>
          {title}
          <div className='inner-content'>
            <div className='text'>
              <p>
                {dollar}
                {amount}
              </p>
              <p>
                {calendar} {dateFormat(date)}
              </p>
              {description && (
                <p>
                  {comment} {description}
                </p>
              )}
            </div>
            <div className='btn-content'>
              <Button
                className='btn-con'
                icon={trash}
                bPad={'.9rem'}
                bRadius={'50%'}
                bg={'var(--primary-color'}
                color={'#fff'}
                onClick={() => onDelete(id)}
              />
              <Button
                className='btn-con'
                icon={edit}
                bPad={'.9rem'}
                bRadius={'50%'}
                bg={'var(--primary-color'}
                color={'#fff'}
                onClick={() => {
                  onUpdate(id);
                  onToggle();
                }}
              />
              <button className='btn-mobile'>
                <i className='fa-solid fa-pen'></i>
              </button>
              <button className='btn-mobile'>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </div>
        </h5>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div<{ type: 'income' | 'expense' }>`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2rem;
    }
  }

  .btn-mobile {
    display: none;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      color: ${(props) => (props.type === 'expense' ? '#FF0000' : '#42AD00')};
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1.4rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }

  .btn-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  @media (max-width: 1500px) {
    gap: 0.5rem;
    .icon {
      width: 70px;
      height: 70px;
    }

    .text p {
      font-size: 1rem;
    }

    .btn-con {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 500px) {
    .icon {
      width: 55px;
      height: 55px;
    }

    .text p {
      font-size: 0.85rem;
    }

    .content {
      h5 {
        font-size: 1.2rem;
      }
    }

    .btn-con {
      display: none;
    }

    .btn-mobile {
      display: block;
      padding: 6px;
      background-color: var(--primary-color);
      border: none;
      color: #fff;
      border-radius: 10px;
    }
  }
`;
