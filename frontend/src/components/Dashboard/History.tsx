/** @format */

import styled from 'styled-components';
import {
  useGetExpensesQuery,
  useGetIncomesQuery,
} from '../../store/financeAPI';
import { FormInput } from '../../utils/typeUtils';

export default function History() {
  const { data: expenses } = useGetExpensesQuery();
  const { data: income } = useGetIncomesQuery();
  const storedData: FormInput[] = [...(income || []), ...(expenses || [])];

  const history = storedData
    .filter((transaction) => transaction.createdAt)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt ?? new Date());
      const dateB = new Date(b.createdAt ?? new Date());
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      {history.map((item) => (
        <div key={item._id} className='history-item'>
          <p
            style={{
              color: item.type === 'expense' ? 'red' : 'var(--color-green)',
            }}
          >
            {item.title}
          </p>
          <p
            style={{
              color: item.type === 'expense' ? 'red' : 'var(--color-green)',
            }}
          >
            {item.type === 'expense'
              ? `- $${item.amount <= 0 ? 0 : item.amount}`
              : `+ $${item.amount <= 0 ? 0 : item.amount}`}
          </p>
        </div>
      ))}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  margin-bottom: 3rem;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
