/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import Form from './IncomeForm';
import {
  useDeleteIncomeMutation,
  useGetIncomesQuery,
  useUpdateIncomeMutation,
} from '../../store/financeAPI';
import IncomeItem from './IncomeItem';
import { useTotalIncome } from '../../utils/useTotal';

export default function Income() {
  const { data, isSuccess } = useGetIncomesQuery();
  const [deleteIncome] = useDeleteIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();
  const totalIncome = useTotalIncome(data ?? []);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className='total-income'>
          Total Income: <span>${totalIncome}</span>
        </h2>
        <div className='income-content'>
          <div className='form-container'>
            <Form />
          </div>
          <div className='incomes'>
            {isSuccess &&
              data.map((income) => (
                <IncomeItem
                  {...income}
                  key={income._id}
                  id={income._id}
                  indicatorColor='var(--color-green)'
                  onDelete={deleteIncome}
                  onUpdate={updateIncome}
                  type={income.type ?? 'expense'}
                />
              ))}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
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
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;
