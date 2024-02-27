/** @format */

import { useEffect, useState } from 'react';
import { FormInput } from './typeUtils';

export function useTotalExpense(expense: FormInput[]) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (expense) {
      setTotal(expense.reduce((total, expense) => total + expense.amount, 0));
    }
  }, [expense]);

  return total;
}

export function useTotalIncome(incomes: FormInput[]) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(incomes)) {
      setTotal(incomes.reduce((total, income) => total + income.amount, 0));
    }
  }, [incomes]);

  return total;
}
