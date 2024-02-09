/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import {
  useGetExpensesQuery,
  useGetIncomesQuery,
} from '../../store/financeAPI';
import Chart from './Chart';
import { dollar } from '../../utils/Icon';
import { useTotalExpense, useTotalIncome } from '../../utils/useTotal';
import History from './History';

export default function Dashboard() {
  const { data: expenses } = useGetExpensesQuery();
  const { data: income } = useGetIncomesQuery();
  const totalExpense = useTotalExpense(expenses ?? []);
  const totalIncome = useTotalIncome(income ?? []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className='stats-con'>
          <div className='chart-con'>
            <Chart />
            <div className='amount-con'>
              <div className='income'>
                <h2>Total Income</h2>
                <p id='income-amount'>
                  {dollar} {totalIncome}
                </p>
              </div>
              <div className='expense'>
                <h2>Total Expense</h2>
                <p id='expense-amount'>
                  {dollar} {totalExpense}
                </p>
              </div>
              <div className='balance'>
                <h2>Total Balance</h2>
                <p id='balance-amount'>
                  {dollar} {totalIncome - totalExpense}
                </p>
              </div>
            </div>
          </div>
          <div className='history-con'>
            <History />
            <h2 className='salary-title'>
              Min <span>Income</span> Max
            </h2>
            <div className='salary-item'>
              {income && income?.length > 0 && (
                <>
                  <p>${Math.min(...income.map((value) => value.amount))}</p>
                  <p>${Math.max(...income.map((value) => value.amount))}</p>
                </>
              )}
              {!income?.length && (
                <>
                  <p>$0</p>
                  <p>$0</p>
                </>
              )}
            </div>
            <h2 className='salary-title'>
              Min <span>Expense</span> Max
            </h2>
            <div className='salary-item'>
              {expenses && expenses?.length > 0 && (
                <>
                  <p>${Math.min(...expenses.map((value) => value.amount))}</p>
                  <p>${Math.max(...expenses.map((value) => value.amount))}</p>
                </>
              )}
              {!expenses?.length && (
                <>
                  <p>$0</p>
                  <p>$0</p>
                </>
              )}
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}
const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          text-align: center;
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 0.8rem;
          p {
            font-size: 3rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }

  @media (max-width: 1400px) {
    #income-amount,
    #expense-amount,
    #balance-amount {
      font-size: 2.25rem;
    }
  }

  @media (max-width: 1300px) {
    .income,
    .expense,
    .balance {
      h2 {
        font-size: 1.5rem;
      }
    }
  }

  @media (max-width: 960px) {
    .stats-con {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .amount-con {
        display: flex !important;
        justify-content: space-evenly;
      }

      .income,
      .expense,
      .balance {
        h2 {
          font-size: 1.25rem;
        }
      }

      #income-amount,
      #expense-amount,
      #balance-amount {
        font-size: 1.85rem;
      }
    }
  }

  @media (max-width: 715px) {
    .stats-con {
      #income-amount,
      #expense-amount,
      #balance-amount {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 525px) {
      .amount-con {
        flex-direction: column;
      }
    }
  }
`;
