'use strict';

const expenses = [];

const getAllExpenses = (searchParams) => {
  const {
    userId,
    categories,
    from,
    to,
  } = searchParams;

  const foundExpenses = expenses.filter(expense => {
    if (
      (userId && expense.userId !== Number(userId))
      || (categories && expense.category !== categories)
      || (from && expense.spentAt < from)
      || (to && expense.spentAt > to)
    ) {
      return false;
    }

    return true;
  });

  return foundExpenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses
    .find((expense) => expense.id === Number(expenseId));

  return foundExpense || null;
};

const addExpense = (expenseData) => {
  const newExpense = {
    id: expenses.length + 1,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const updateExpense = (expenseId, expenseData) => {
  const updatedExpense = getExpenseById(expenseId);

  if (!updatedExpense) {
    return null;
  }

  Object.assign(updatedExpense, expenseData);

  return updatedExpense;
};

const deleteExpense = (expenseId) => {
  const expenseIndex = expenses
    .findIndex((expense) => expense.id === Number(expenseId));

  if (expenseIndex === -1) {
    return false;
  }

  expenses.splice(expenseIndex, 1);

  return true;
};

module.exports = {
  expenses,
  getExpenseById,
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
