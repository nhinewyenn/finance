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
import { FormInput } from '../../utils/typeUtils';

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

  const allData: FormInput[] = [...(incomes || []), ...(expenses || [])];

  const filteredData = allData.filter(
    (item) => item.amount !== undefined && item.amount !== null
  );

  // Remove dupes from data
  const uniqueDates = Array.from(
    new Set(filteredData.map((item) => item.date))
  ).filter((date, index, self) => index === 0 || date !== self[index - 1]);

  // Sort unique dates in ascending order
  uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const data = {
    labels: uniqueDates.map((date) => dateFormat(date)),
    datasets: [
      {
        label: 'Income',
        data: incomes?.map((income) => income.amount),
        backgroundColor: 'green',
        tension: 0.5,
      },
      {
        label: 'Expense',
        data: expenses?.map((expense) => expense.amount),
        backgroundColor: 'red',
        tension: 0.5,
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
  height: 90%;

  @media (max-width: 1450px) {
    height: 70%;
  }
`;
