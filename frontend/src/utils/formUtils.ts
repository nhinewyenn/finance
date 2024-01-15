/** @format */

import moment from 'moment';

export const incomeCategory = [
  { label: 'Salary', value: 'salary' },
  { label: 'Freelancing', value: 'freelancing' },
  { label: 'Investments', value: 'investments' },
  { label: 'Stocks', value: 'stocks' },
  { label: 'Bank Transfer', value: 'bank' },
  { label: 'Online', value: 'online' },
  { label: 'Other', value: 'other' },
];

export const expenseCategory = [
  { value: 'education', label: 'Education' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'health', label: 'Health' },
  { value: 'subscriptions', label: 'Subscriptions' },
  { value: 'takeaways', label: 'Takeaways' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'travel', label: 'Travel' },
  { value: 'other', label: 'Other' },
];

export function dateFormat(date: Date) {
  return moment(date).format('DD/MM/YY');
}
