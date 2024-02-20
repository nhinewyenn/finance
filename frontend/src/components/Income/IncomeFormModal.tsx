/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { incomeCategory } from '../../utils/formUtils';
import {
  useAddIncomeMutation,
  useUpdateIncomeMutation,
} from '../../store/financeAPI';
import { FormInput } from '../../utils/typeUtils';
import Button from '../Button/Button';
import { plus } from '../../utils/Icon';

type IncomeFormProps = {
  updateMode: boolean;
  selectedIncome: FormInput | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function IncomeFormModal({
  updateMode,
  selectedIncome,
  isOpen,
  onClose,
}: IncomeFormProps) {
  const [inputState, setInputState] = useState<FormInput>({
    _id: '',
    title: '',
    amount: 0,
    date: new Date(),
    category: '',
    description: '',
  });
  const [updateIncome] = useUpdateIncomeMutation();
  const [addIncome, { isError, error }] = useAddIncomeMutation();
  const { title, amount, date, category, description } = inputState;

  useEffect(() => {
    // Update form when selectedIncome changes
    if (selectedIncome) {
      setInputState(selectedIncome);
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
  }, [selectedIncome, updateMode]);

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
          await updateIncome(inputState).unwrap();
        } else {
          await addIncome(inputState).unwrap();
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
        console.error('Error adding/updating income:', error);
      }
    },
    [addIncome, updateIncome, inputState, updateMode]
  );

  return (
    <>
      {isOpen && (
        <ModalStyled>
          <OverlayStyled>
            <FormStyled onSubmit={handleSubmit}>
              <div className='form-header'>
                <h3>Income form</h3>
                <button onClick={onClose}>X</button>
              </div>
              {isError && error && (
                <p className='error'>All fields are required</p>
              )}
              <div className='input-control'>
                <input
                  type='text'
                  name='title'
                  placeholder='Income Title'
                  onChange={handleInput('title')}
                  value={title}
                />
              </div>
              <div className='input-control'>
                <input
                  type='text'
                  name='amount'
                  placeholder='Income Amount'
                  onChange={handleInput('amount')}
                  value={amount}
                />
              </div>
              <div className='input-control'>
                <DatePicker
                  wrapperClassName='date-picker'
                  id='date'
                  placeholderText='Enter a date'
                  selected={date ?? selectedIncome?.date ?? new Date()}
                  dateFormat='dd/MM/yyyy'
                  onChange={(date) => {
                    if (date && !isNaN(date.getTime())) {
                      setInputState({ ...inputState, date });
                    }
                  }}
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
                  {incomeCategory.map((option) => (
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
                />
              </div>
              <div className='submit-btn'>
                <Button
                  name={updateMode ? 'Update' : 'Submit'}
                  icon={plus}
                  bPad={'.8rem 1.6rem'}
                  bRadius={'30px'}
                  bg={'var(--color-accent'}
                  color={'#fff'}
                />
              </div>
            </FormStyled>
          </OverlayStyled>
        </ModalStyled>
      )}
    </>
  );
}

const ModalStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 65vh;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: #fcf6f9;
  border-radius: 15px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
  display: none;

  @media (max-width: 967px) {
    display: block;
  }
`;

const OverlayStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
`;

const FormStyled = styled.form`
  display: flex;
  padding: 2rem;
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

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-header button {
    color: #fff;
    background: rgba(34, 34, 96, 0.9);
    padding: 5px;
    border: none;
    border-radius: 5px;
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
    justify-content: flex-start;
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

  @media (max-width: 500px) {
    .submit-btn {
      button {
        padding: 0.75rem !important;
      }
    }

    .input-control {
      textarea {
        width: 90%;
      }
    }
  }
`;
