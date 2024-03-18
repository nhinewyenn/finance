/** @format */

import { useEffect, useState } from 'react';
import { FormInput } from '../utils/typeUtils';

export function useTotalExpense(expense: FormInput[]) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (expense) {
      setTotal(
        expense.reduce((acc, item) => {
          if (item.amount !== null && item.amount !== undefined) {
            return acc + item.amount;
          }
          return acc;
        }, 0)
      );
    }
  }, [expense]);

  return total;
}

export function useTotalIncome(incomes: FormInput[]) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (incomes) {
      setTotal(
        incomes.reduce((acc, item) => {
          if (item.amount !== null && item.amount !== undefined) {
            return acc + item.amount;
          }
          return acc;
        }, 0)
      );
    }
  }, [incomes]);

  return total;
}
