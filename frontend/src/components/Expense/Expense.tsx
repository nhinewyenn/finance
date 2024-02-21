/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import ExpenseForm from './ExpenseForm';
import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
} from '../../store/financeAPI';
import IncomeItem from '../Income/IncomeItem';
import { useTotalExpense } from '../../utils/useTotal';
import { useState } from 'react';
import { FormInput } from '../../utils/typeUtils';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';
import ExpenseFormModal from './ExpenseFormModal';

export default function Expense() {
  const { data, isSuccess } = useGetExpensesQuery();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const totalExpense = useTotalExpense(data ?? []);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<FormInput | null>(
    null
  );

  async function handleUpdate(id: string) {
    const expense = data?.find((v) => v._id === id);

    if (expense) {
      const formattedExpense = {
        ...expense,
        date: new Date(expense.date),
        _id: id,
      };
      try {
        setToggleUpdate(true);
        await updateExpense(formattedExpense).unwrap();
        setSelectedExpense(formattedExpense);
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    }
  }

  return (
    <ExpenseStyled>
      <InnerLayout>
        <div className='top-content'>
          <h1>Expenses</h1>
          <Button
            name={'Add expense'}
            icon={plus}
            bPad={'.8rem 1.6rem'}
            bRadius={'30px'}
            bg={'var(--color-transparent'}
            color={'var(--color-accent'}
            onClick={() => {
              setToggleModal(true);
              setToggleUpdate(false);
              setSelectedExpense(null);
            }}
          />
        </div>
        <h2 className='total-expense'>
          Total Expense: <span>${totalExpense}</span>
        </h2>
        <div className='expenses-content'>
          <div className='form-container'>
            <ExpenseForm
              updateMode={toggleUpdate}
              selectedExpense={selectedExpense}
            />
            <ExpenseFormModal
              updateMode={toggleUpdate}
              selectedExpense={selectedExpense}
              isOpen={toggleModal}
              onClose={() => setToggleModal(false)}
            />
          </div>
          <div className='expenses'>
            {isSuccess &&
              data.map((expense) => (
                <IncomeItem
                  {...expense}
                  key={expense._id}
                  id={expense._id}
                  onDelete={deleteExpense}
                  onUpdate={handleUpdate}
                  type={expense.type ?? 'expense'}
                  onToggle={() => setToggleModal(true)}
                />
              ))}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;

  .top-content {
    display: flex;
    justify-content: space-between;
    button {
      display: none;
    }
  }

  .total-expense {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-delete);
    }
  }

  .expenses-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }

  @media (max-width: 967px) {
    .top-content {
      button {
        display: block;
        border: 2px solid #f56692;
      }
    }

    .expenses-content {
      display: block;
    }
  }

  @media (max-width: 500px) {
    .top-content {
      button {
        padding: 0.7rem !important;
        font-size: 0.8rem;
      }
    }

    h1 {
      font-size: 1.8rem;
    }

    .total-expense {
      font-size: 1.5rem;
      span {
        font-size: 1.75rem;
      }
    }
  }
`;
