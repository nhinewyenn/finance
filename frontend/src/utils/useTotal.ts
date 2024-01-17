/** @format */

import { useEffect, useState } from 'react';
import { FormInput } from './typeUtils';

export const useTotalExpense = (expense: FormInput[]) => {
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    if (expense) {
      setTotalExpense(
        expense.reduce((total, expense) => total + expense.amount, 0)
      );
    }
  }, [expense]);

  return totalExpense;
};

export const useTotalIncome = (incomes: FormInput[]) => {
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (incomes) {
      setTotalIncome(
        incomes.reduce((total, income) => total + income.amount, 0)
      );
    }
  }, [incomes]);

  return totalIncome;
};
