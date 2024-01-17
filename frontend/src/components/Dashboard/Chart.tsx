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
  const { data: income } = useGetIncomesQuery();

  const data = {
    labels: income?.map((income) => dateFormat(income.date)),
    datasets: [
      {
        labels: 'Income',
        data: [...income?.map((income) => income.amount)],
        backgroundColor: 'green',
      },
      {
        labels: 'Expense',
        data: [...expenses?.map((expense) => expense.amount)],
        backgroundColor: 'red',
      },
    ],
  };
  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;
