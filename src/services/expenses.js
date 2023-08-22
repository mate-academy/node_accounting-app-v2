'use strict';

const expenses = [];

const getExpenses = (searchParams) => {
  const {
    userId,
    categories,
    from,
    to,
  } = searchParams;

  let foundExpenses = expenses;

  if (userId) {
    foundExpenses = foundExpenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    foundExpenses = foundExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    foundExpenses = foundExpenses
      .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
  }

  return foundExpenses;
};

const getExpense = (expenseId) => {
  const findExpense = expenses.find(expense => expense.id === +expenseId);

  return findExpense || null;
};

const deleteExpense = (expenseId) => {
  const expenseIndex = expenses.findIndex(expense => expense.id === +expenseId);

  if (expenseIndex === -1) {
    return false;
  };

  expenses.splice(expenseIndex, 1);

  return true;
};

const addExpense = (expenseData) => {
  const maxId = expenses.reduce((max, expense) => Math.max(max, expense.id), 0);

  const newExpense = {
    id: maxId + 1,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, expenseData) => {
  const updatedExpense = getExpense(expenseId);

  if (!updatedExpense) {
    return null;
  }

  Object.assign(updatedExpense, expenseData);

  return updatedExpense;
};

module.exports = {
  expenses,
  getExpenses,
  getExpense,
  deleteExpense,
  addExpense,
  updateExpense,
};
