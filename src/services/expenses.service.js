'use strict';

let expenses = [];

const getAllExpenses = ({
  userId,
  categories,
  to,
}) => {
  let currentExpenses = expenses;

  if (userId) {
    currentExpenses = currentExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    currentExpenses = currentExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (to) {
    currentExpenses = currentExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return currentExpenses;
};

const createExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const createdExpense = {
    id: Date.now(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(createdExpense);

  return createdExpense;
};

const getExpenseById = (expenseId) => {
  const findExpense = expenses.find(expense => expense.id === +expenseId);

  return findExpense || null;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpense = (expenseId, paramsToUpdate) => {
  const expenseToUpdate = getExpenseById(expenseId);

  Object.assign(expenseToUpdate, paramsToUpdate);

  return expenseToUpdate;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
  resetExpenses,
};
