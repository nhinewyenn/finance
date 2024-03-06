/** @format */

import moment from 'moment';
import {
  book,
  card,
  circle,
  clothing,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  tv,
  users,
  yt,
} from './Icon';

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

export function incomeCategoryIcon(category: string) {
  switch (category) {
    case 'salary':
      return money;
    case 'freelancing':
      return freelance;
    case 'investments':
      return stocks;
    case 'stocks':
      return users;
    case 'bank':
      return card;
    case 'online':
      return yt;
    case 'other':
      return piggy;
    default:
      return '';
  }
}

export function expenseCategoryIcon(category: string) {
  switch (category) {
    case 'education':
      return book;
    case 'groceries':
      return food;
    case 'health':
      return medical;
    case 'subscriptions':
      return tv;
    case 'takeaways':
      return takeaway;
    case 'clothing':
      return clothing;
    case 'travel':
      return freelance;
    case 'other':
      return circle;
    default:
      return '';
  }
}

export function dateFormat(date: Date) {
  return moment(date).format('DD/MM/YY');
}

export function useGetUserId() {
  return localStorage.getItem('userID');
}

export function getToken() {
  return localStorage.getItem('access_token');
}
