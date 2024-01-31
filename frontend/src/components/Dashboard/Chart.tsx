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

type Accumulator = { [key: string]: number };

export default function Chart() {
  const { data: expenses } = useGetExpensesQuery();
  const { data: incomes } = useGetIncomesQuery();

  const incomeData = incomes?.reduce((acc: Accumulator, income) => {
    acc[income.date.toString()] = income.amount;
    return acc;
  }, {});

  const expenseData = expenses?.reduce((acc: Accumulator, expense) => {
    acc[expense.date.toString()] = expense.amount;
    return acc;
  }, {});

  const allData: FormInput[] = [...(incomes || []), ...(expenses || [])];

  const filteredData = allData.filter(
    (v) => v.amount !== undefined && v.amount !== null && v.amount !== 0
  );

  const datesWithData = filteredData.map((v) => v.date);

  console.log(datesWithData);

  // Remove duplicates and maintain order:
  const uniqueDates = Array.from(new Set(datesWithData));
  console.log(uniqueDates);

  // Sort unique dates in ascending order:
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
