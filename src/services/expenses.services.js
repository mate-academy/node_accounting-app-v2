'use strict';

let expenses = [];
let currentId = 0;

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
  const currentExpenses = getExpenseById(expenseId);

  Object.assign(currentExpenses, params);

  return currentExpenses;
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
