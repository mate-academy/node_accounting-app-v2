'use strict';

let expenses = [];
let currentId = 0;

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let currentExpenses = expenses;

  if (userId) {
    currentExpenses = currentExpenses
      .filter(exp => exp.userId === +userId);
  }

  if (categories) {
    currentExpenses = currentExpenses
      .filter(exp => categories.includes(exp.category));
  }

  if (from) {
    currentExpenses = currentExpenses
      .filter(exp => exp.spentAt >= from);
  }

  if (to) {
    currentExpenses = currentExpenses
      .filter(exp => exp.spentAt <= to);
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
  const findExpense = expenses.find(exp => +exp.id === +expenseId);

  return findExpense || null;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(exp => +exp.id !== +expenseId);
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
