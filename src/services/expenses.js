'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = () => {
  return expenses;
};

const getFilteredExpenses = ({ userId, category, categories, from, to }) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
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
  return expenses.find(expense => expense.id === +expenseId);
};

const createExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const newExpense = {
    id: Math.random(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
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
