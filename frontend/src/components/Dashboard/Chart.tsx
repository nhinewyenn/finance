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
  const { data: expenses } = useGetExpensesQuery();
  const { data: incomes } = useGetIncomesQuery();

  const incomeArr = Array.isArray(incomes) ? incomes : [];
  const expenseArr = Array.isArray(expenses) ? expenses : [];
  const incomeData: Record<string, number> = {};
  const expenseData: Record<string, number> = {};

  [...incomeArr, ...expenseArr].forEach((v) => {
    const dateStr = v.date.toString();
    if (v.amount !== undefined && v.amount !== null && v.amount !== 0) {
      if (v.type === 'income') {
        incomeData[dateStr] = (incomeData[dateStr] || 0) + v.amount;
      } else {
        expenseData[dateStr] = (expenseData[dateStr] || 0) + v.amount;
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

  @media (max-width: 1195px) {
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
