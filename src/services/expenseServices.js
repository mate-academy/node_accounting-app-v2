'use strict';

const getMaxId = (array) => {
  const maxId = Math.max(array.map(({ id }) => id)) + 1;

  return maxId;
};

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => Number(expense.userId) === Number(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => (
        expense.spentAt > from
        && expense.spentAt < to
      ));
  }

  if (from && !to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to && !from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

const getExpenseByUserId = (expenseId) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense;
};

const getExpenseById = (id) => {
  const foundExpense = expenses
    .find(expense => expense.id === Number(id));

  return foundExpense;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: getMaxId(expenses),
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

const deleteExpense = (expenseId) => {
  expenses = expenses
    .filter(expense => expense.id !== Number(expenseId));
};

const updateExpense = (expenseId, req) => {
  const expense = getExpenseById(expenseId);

  Object.assign(expense, req);
};

module.exports = {
  getExpenses,
  getExpenseByUserId,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
