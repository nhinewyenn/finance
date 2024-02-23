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
import { useState } from 'react';
import { FormInput } from '../../utils/typeUtils';
import IncomeFormModal from './IncomeFormModal';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';
import { LoadingSpinner } from '../../utils/LoadingSpinner';

export default function Income() {
  const { data, isSuccess, isLoading } = useGetIncomesQuery();
  const [deleteIncome] = useDeleteIncomeMutation();
  const [updateIncome] = useUpdateIncomeMutation();
  const totalIncome = useTotalIncome(data ?? []);
  const [selectedIncome, setSelectedIncome] = useState<FormInput | null>(null);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  console.log(data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function handleUpdate(id: string) {
    const income = data?.find((v) => v._id === id);

    if (income) {
      const formattedIncome = {
        ...income,
        date: new Date(income.date),
        _id: id,
      };
      try {
        setToggleUpdate(true);
        await updateIncome(formattedIncome).unwrap();
        setSelectedIncome(formattedIncome);
      } catch (error) {
        console.error('Error updating income:', error);
      }
    }
  }

  return (
    <IncomeStyled>
      <InnerLayout>
        <div className='top-content'>
          <h1>Incomes</h1>
          <Button
            name={'Add income'}
            icon={plus}
            bPad={'.8rem 1.6rem'}
            bRadius={'30px'}
            bg={'var(--color-transparent'}
            color={'var(--color-accent'}
            onClick={() => {
              setToggleModal(true);
              setToggleUpdate(false);
              setSelectedIncome(null);
            }}
          />
        </div>
        <h2 className='total-income'>
          Total Income: <span>${totalIncome}</span>
        </h2>
        <div className='income-content'>
          <div className='form-container'>
            <Form updateMode={toggleUpdate} selectedIncome={selectedIncome} />
            <IncomeFormModal
              updateMode={toggleUpdate}
              selectedIncome={selectedIncome}
              isOpen={toggleModal}
              onClose={() => setToggleModal(false)}
            />
          </div>
          <div className='incomes'>
            {isSuccess &&
              Array.isArray(data) &&
              data.map((income) => (
                <IncomeItem
                  {...income}
                  key={income._id}
                  id={income._id}
                  onDelete={deleteIncome}
                  onUpdate={handleUpdate}
                  type={income.type ?? 'expense'}
                  onToggle={() => setToggleModal(true)}
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

  .top-content {
    display: flex;
    justify-content: space-between;
    button {
      display: none;
    }
  }

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

  @media (max-width: 1000px) {
    .income-content {
      gap: 1.75rem;
    }
  }

  @media (max-width: 967px) {
    .top-content {
      button {
        display: block;
        border: 2px solid #f56692;
      }
    }

    .income-content {
      display: block;
    }
  }

  @media (max-width: 715px) {
    .total-income {
      font-size: 1.75rem;
      span {
        font-size: 2rem;
      }
    }
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.8rem;
    }

    .total-income {
      font-size: 1.5rem;
      span {
        font-size: 1.75rem;
      }
    }

    .top-content {
      button {
        padding: 0.7rem !important;
        font-size: 0.8rem;
      }
    }
  }
`;
