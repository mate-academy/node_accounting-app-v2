'use strict';

const expenses = [
  {
    'id': 0,
    'userId': 0,
    'spentAt': '2024-01-30T10:03:31.613Z',
    'title': 'string',
    'amount': 0,
    'category': 'string',
    'note': 'string',
  },
];

const getAllExpenses = () => {
  return expenses;
};

const getExpensesById = (id) => {
  const expense = expenses.find(el => el.id === id) || null;

  return expense;
};

module.exports = {
  getAllExpenses,
  getExpensesById,
};
