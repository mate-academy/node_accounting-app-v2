'use strict';

const { filterExpense } = require('../utils/filterExpense');
const { getNewId } = require('../utils/getNewId');

let expenses = [
  {
    id: 1,
    userId: 1,
    spentAt: '2022-10-19T11:01:43.462Z',
    title: 'Buy a new TV',
    amount: 999,
    category: 'Electronics',
    note: 'I need a new laptop',
  },
];

const getAll = (queryParams) => {
  if (!(Object.keys(queryParams).length)) {
    return expenses;
  }

  return filterExpense(expenses, queryParams);
};

const getById = id => expenses.find(expense => expense.id === id);

const create = (expense) => {
  const newExpense = {
    id: getNewId(expenses),
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, updatedExpense) => {
  const expense = getById(id);

  Object.assign(expense, updatedExpense);

  return expense;
};

const remove = (id) => {
  const filteredExpenses = expenses.filter(expense => expense.id !== id);

  expenses = filteredExpenses;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
