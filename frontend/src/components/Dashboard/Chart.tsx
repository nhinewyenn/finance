/** @format */
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  useGetExpensesQuery,
  useGetIncomesQuery,
} from '../../store/financeAPI';
import { dateFormat } from '../../utils/formUtils';
import { LoadingSpinner } from '../../utils/LoadingSpinner';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Chart() {
  const {
    data: expenses,
    isLoading: isExpenseLoading,
    isSuccess: expenseSuccess,
  } = useGetExpensesQuery();
  const {
    data: incomes,
    isLoading: isIncomeLoading,
    isSuccess: incomeSuccess,
  } = useGetIncomesQuery();

  const incomeArr = Array.isArray(incomes) ? incomes : [];
  const expenseArr = Array.isArray(expenses) ? expenses : [];
  const incomeData: Record<string, number> = {};
  const expenseData: Record<string, number> = {};

  [...incomeArr, ...expenseArr].forEach((el) => {
    const dateStr = el.date.toString();
    if (el.amount !== undefined && el.amount !== null && el.amount !== 0) {
      if (el.type === 'income') {
        incomeData[dateStr] = (incomeData[dateStr] || 0) + el.amount;
      } else {
        expenseData[dateStr] = (expenseData[dateStr] || 0) + el.amount;
      }
    }
  });

  const uniqueDates = Array.from(
    new Set([...incomeArr.map((v) => v.date), ...expenseArr.map((v) => v.date)])
  );
  uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const data = {
    labels: uniqueDates.map((date) => dateFormat(date)),
    datasets: [
      {
        label: 'Income',
        data: uniqueDates.map((date) => incomeData?.[date.toString()] || 0),
        backgroundColor: 'green',
        tension: 0.5,
      },
      {
        label: 'Expense',
        data: uniqueDates.map((date) => expenseData?.[date.toString()] || 0),
        backgroundColor: 'red',
        tension: 0.5,
      },
    ],
  };

  if (isIncomeLoading || isExpenseLoading) {
    return <LoadingSpinner />;
  }

  if (!incomeSuccess || !expenseSuccess) {
    return <div>Error: Failed to fetch data</div>;
  }

  return (
    <ChartStyled>
      {incomeData && expenseData && <Line data={data} />}
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 90%;

  @media (max-width: 1450px) {
    height: 75%;
  }

  @media (max-width: 1295px) {
    height: 60%;
  }

  @media (max-width: 960px) {
    height: 75%;
  }

  @media (max-width: 860px) {
    height: 70%;
  }

  @media (max-width: 595px) {
    height: 60%;
  }

  @media (max-width: 525px) {
    height: 50%;
    width: 100%;
  }

  @media (max-width: 485px) {
    height: 40%;
    width: 100%;
  }
`;
