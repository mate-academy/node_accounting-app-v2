'use strict';

let expenses = [];
let currentId = 0;

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  const currentExpenses = expenses
    .filter(exp => (userId ? exp.userId === +userId : true)
      && (categories ? categories.includes(exp.category) : true)
      && (from ? new Date(exp.spentAt) >= new Date(from) : true)
      && (to ? new Date(exp.spentAt) <= new Date(to) : true));

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
