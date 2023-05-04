'use strict';

let expenses = [];

const getInitial = () => {
  expenses = [];

  return expenses;
};

const getAllExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = expenses.filter(
      ({ category }) => categories.includes(category)
    );
  }

  if (from) {
    filteredExpenses = expenses.filter(({ spentAt }) => spentAt > from);
  }

  if (to) {
    filteredExpenses = expenses.filter(({ spentAt }) => spentAt < to);
  }

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === +expenseId) || null;

  return foundExpense;
};

const createExpense = (expenseBody) => {
  const newExpense = {
    id: Math.max(...expenses.map(expense => expense.id), 0) + 1,
    ...expenseBody,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== +expenseId);
};

const updateExpense = (expenseId, body) => {
  let foundExpense = expenses.find(({ id }) => id === +expenseId) || null;

  foundExpense = {
    ...foundExpense,
    ...body,
  };

  return foundExpense;
};

module.exports = {
  getInitial,
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
