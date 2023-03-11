'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = () => expenses;

const getFilteredExpenses = ({ userId, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from && expense.spentAt < to);
  }

  return filteredExpenses;
};

const getExpense = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const createExpense = (data) => {
  const newExpense = {
    id: Math.random(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = ({
  id,
  data,
}) => {
  const expenseToUpdate = getExpense(id);

  Object.assign(expenseToUpdate, data);

  return expenseToUpdate;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

module.exports = {
  init,
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getFilteredExpenses,
};
