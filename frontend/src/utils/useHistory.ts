/** @format */

import { useEffect, useState } from 'react';
import { FormInput } from './typeUtils';

const useTransactionHistory = (
  incomes?: FormInput[],
  expenses?: FormInput[]
) => {
  const [history, setHistory] = useState<FormInput[]>([]);

  useEffect(() => {
    if (!incomes || !expenses) {
      return;
    }

    const combinedHistory = [...incomes, ...expenses];
    const sortedHistory = combinedHistory
      .filter((transaction) => transaction.createdAt)
      .sort((a, b) => {
        const dateA = a.createdAt ?? new Date(0);
        const dateB = b.createdAt ?? new Date(0);

        return dateB.getTime() - dateA.getTime();
      });

    setHistory(sortedHistory.slice(0, 3));
  }, [incomes, expenses]);

  return history;
};

export default useTransactionHistory;
