'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [{
  id: 0,
  userId: 3,
  spentAt: '2023-02-03T12:35:01.779Z',
  title: 'supermarket',
  amount: 500,
  category: 'products',
  note: 'buy some products',
},
{
  id: 1,
  userId: 5,
  spentAt: '2023-01-03T12:35:01.779Z',
  title: 'cars shop',
  amount: 1000,
  category: 'car',
  note: 'buy car',
}];

const getAll = () => {
  return expenses;
};

const getById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const add = (expenseData) => {
  const newExpense = {
    id: uuidv4(),
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (expense, expenseData) => {
  Object.assign(expense, expenseData);
};

const remove = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  getAll, getById, add, update, remove,
};
