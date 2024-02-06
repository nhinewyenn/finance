/** @format */

import styled from 'styled-components';
import { FormInput } from '../../utils/typeUtils';
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from '../../store/financeAPI';
import ReactDatePicker from 'react-datepicker';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';
import { expenseCategory } from '../../utils/formUtils';
import { useCallback, useEffect, useState } from 'react';

type ExpenseFormProps = {
  updateMode: boolean;
  selectedExpense: FormInput | null;
};

export default function ExpenseForm({
  updateMode,
  selectedExpense,
}: ExpenseFormProps) {
  const [inputState, setInputState] = useState<FormInput>({
    _id: '',
    title: '',
    amount: 0,
    date: new Date(),
    category: '',
    description: '',
  });
  const [updateExpense] = useUpdateExpenseMutation();
  const [addExpense, { isError, error }] = useAddExpenseMutation();
  const { title, amount, date, category, description } = inputState;

  useEffect(() => {
    // Update form when selectedExpense changes
    if (selectedExpense) {
      setInputState(selectedExpense);
    } else {
      setInputState({
        _id: '',
        title: '',
        amount: 0,
        date: new Date(),
        category: '',
        description: '',
      });
    }
  }, [selectedExpense, updateMode]);

  const handleInput =
    (name: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      try {
        if (name === 'date') {
          const selectedDate = new Date(e.target.value);
          setInputState({ ...inputState, [name]: selectedDate });
        } else {
          setInputState({ ...inputState, [name]: e.target.value });
        }
      } catch (error) {
        console.error('Error updating date:', error);
      }
    };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        if (updateMode) {
          await updateExpense(inputState).unwrap();
          // we want to refetch the data right after -> get-expenses payload
        } else {
          await addExpense(inputState).unwrap();
          // this immediately refetch with the get-expenses
        }
        setInputState({
          _id: '',
          title: '',
          amount: 0,
          date: new Date(),
          category: '',
          description: '',
        });
      } catch (error) {
        throw new Error('Error adding expense:' + error);
      }
    },
    [addExpense, inputState, updateExpense, updateMode]
  );

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {isError && error && <p className='error'>All fields are required</p>}
      <div className='input-control'>
        <input
          type='text'
          value={title}
          name={'title'}
          placeholder='Expense Title'
          onChange={handleInput('title')}
        />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='text'
          name={'amount'}
          placeholder={'Expense Amount'}
          onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <ReactDatePicker
          wrapperClassName='date-picker'
          id='date'
          placeholderText='Enter a date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) =>
            setInputState({ ...inputState, date: date ?? new Date() })
          }
        />
      </div>
      <div className='selects input-control'>
        <select
          required
          value={category}
          name='category'
          id='category'
          onChange={handleInput('category')}
        >
          <option value='' disabled>
            Select Option
          </option>
          {expenseCategory.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className='input-control'>
        <textarea
          name='description'
          value={description}
          placeholder='Add A Reference'
          id='description'
          cols={30}
          rows={4}
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className='submit-btn'>
        <Button
          name={updateMode ? 'Update Expense' : 'Add Expense'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRadius={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .date-picker {
    width: 100%;
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
