/** @format */

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { optionsCategory } from '../../utils/formOptions';
import { useAddIncomeMutation } from '../../store/financeSlice';
import { FormInput } from '../../utils/typeUtils';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';

export default function Form() {
  const [inputState, setInputState] = useState<FormInput>({
    title: '',
    amount: 0,
    date: new Date(),
    category: '',
    description: '',
  });

  const [addIncomeMutation, { isError, error }] = useAddIncomeMutation();
  const { title, amount, date, category, description } = inputState;

  const handleInput =
    (name: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setInputState({ ...inputState, [name]: e.target.value });
    };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const result = await addIncomeMutation(inputState).unwrap();
        // Handle the result if needed
        console.log('Mutation result:', result);
        setInputState({
          title: '',
          amount: 0,
          date: new Date(),
          category: '',
          description: '',
        });
      } catch (error) {
        console.error('Error adding income:', error);
      }
    },
    [addIncomeMutation, inputState]
  );

  if (isError && error) {
    return <div>{error.toString()}</div>;
  }

  console.log(title, amount);

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className='input-control'>
        <input
          type='text'
          name='title'
          placeholder='Salary Title'
          onChange={handleInput('title')}
          value={title}
        />
      </div>
      <div className='input-control'>
        <input
          type='text'
          name='amount'
          placeholder='Salary Amount'
          onChange={handleInput('amount')}
          value={amount}
        />
      </div>
      <div className='input-control'>
        <DatePicker
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
          {optionsCategory.map((option) => (
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
          name={'Add Income'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRadius={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
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
