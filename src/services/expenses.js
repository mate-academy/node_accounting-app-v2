'use strict';

let expenses = [];

const getExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter((expense) => (expense.userId === Number(userId)));
  };

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(({ category }) => (categories.includes(category)));
  };

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(({ spentAt }) => (spentAt >= from));
  };

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(({ spentAt }) => (spentAt <= to));
  };

  return filteredExpenses;
};

const getExpenseById = (expenseId) => {
  return expenses
    .find(({ id }) => id === Number(expenseId)) || null;
};

const createExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: expenses.length + 1,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, newData) => {
  const expenseToUpdate = getExpenseById(expenseId);

  Object.assign(expenseToUpdate, newData);

  return expenseToUpdate;
};

const deleteExpense = (expenseId) => {
  expenses = expenses
    .filter(({ id }) => id !== expenseId);
};

const reset = () => {
  expenses.length = 0;
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  reset,
};
