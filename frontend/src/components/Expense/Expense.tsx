/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import ExpenseForm from './ExpenseForm';
import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from '../../store/financeAPI';
import IncomeItem from '../Income/IncomeItem';
import { useTotalExpense } from '../../utils/useTotal';

export default function Expense() {
  const { data, isSuccess } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();
  const totalExpense = useTotalExpense(data ?? []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className='total-expense'>
          Total Expense: <span>${totalExpense}</span>
        </h2>
        <div className='expenses-content'>
          <div className='form-container'>
            <ExpenseForm />
          </div>
          <div className='expenses'>
            {isSuccess &&
              data.map((expense) => (
                <IncomeItem
                  {...expense}
                  key={expense._id}
                  id={expense._id}
                  indicatorColor='var(--color-green)'
                  onDelete={deleteExpense}
                  type={expense.type ?? 'expense'}
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
      color: var(--color-green);
    }
  }
  .expenses-content {
    display: flex;
    gap: 2rem;
    .expenses {
      flex: 1;
    }
  }
`;
