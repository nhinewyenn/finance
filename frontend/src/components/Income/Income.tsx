/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import Form from '../Form/Form';
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomesQuery,
} from '../../store/financeAPI';
import IncomeItem from './IncomeItem';

export default function Income() {
  const { data: incomes, isFetching, isSuccess } = useGetIncomesQuery();
  const [addIncome, { isError, error }] = useAddIncomeMutation();
  const [deleteIncome] = useDeleteIncomeMutation();

  console.log(incomes);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <div className='income-content'>
          <div className='form-container'>
            <Form />
          </div>
          <div className='incomes'>
            {incomes?.map((income) => (
              <IncomeItem
                {...income}
                key={income._id}
                id={income._id}
                indicatorColor='var(--color-green)'
                onDelete={deleteIncome}
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
