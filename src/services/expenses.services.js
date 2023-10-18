'use strict';

let expenses = [];
let currentId = 0;

const getAll = ({
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
  currentId++;

  const newExpense = {
    id: currentId,
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

const getExpenseById = (expenseId) => {
  const findExpense = expenses.find(expense => +expense.id === +expenseId);

  return findExpense || null;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(expense => +expense.id !== +expenseId);
};

const updateExpense = (expenseId, params) => {
  const currentExpense = getExpenseById(expenseId);

  Object.assign(currentExpense, params);

  return currentExpense;
};

const resetExpense = () => {
  expenses = [];
};

module.exports = {
  getAll,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
  resetExpense,
};
