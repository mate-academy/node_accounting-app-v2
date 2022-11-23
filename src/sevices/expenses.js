'use strict';

let expenses = [
  {
    'id': 1,
    'userId': 0,
    'spentAt': '2022-11-22T22:45:19.627Z',
    'title': 'Skis',
    'amount': 0,
    'category': 'Sport',
    'note': 'string',
  },
];

const getExpenses = () => {
  return expenses;
};
const getExpenseById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const createExpense = (data) => {
  const maxId = expenses.length === 0
    ? 0
    : Math.max(...expenses.map(user => user.id));

  const newExpense = {
    id: maxId + 1,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
};
