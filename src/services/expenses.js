'use strict';

const generateNewId = require('../utiles/generateNewId');

let expenses = [];

const setInitialExpenses = (initialExpenses) => {
  expenses = initialExpenses;

  return expenses;
};

const getFilteredExpenses = ({ userId,
  categories,
  from,
  to }) => {
  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const isFromMath = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMath && isToMatch;
  });
};

const getExpenseById = (userId) => {
  const foundExpense = expenses.find(user => user.id === +userId);

  return foundExpense || null;
};

const createNewExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) => {
  const newExpense = {
    id: generateNewId(expenses),
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
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpense = ({ id, newData }) => {
  let expenseToUpdate = getExpenseById(id);

  expenseToUpdate = {
    ...expenseToUpdate,
    ...newData,
  };

  return expenseToUpdate;
};

module.exports = {
  setInitialExpenses,
  getFilteredExpenses,
  getExpenseById,
  createNewExpense,
  deleteExpense,
  updateExpense,
};
