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

  const data = {
    labels: incomes?.map((income) => dateFormat(income.date)),
    datasets: [
      {
        label: 'Income',
        data: incomes?.map((income) => income.amount),
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expense',
        data: expenses?.map((expense) => expense.amount),
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };

  console.log(data);

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
