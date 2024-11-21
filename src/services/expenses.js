'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getFilteredExpense = (searchParams) => {
  const { userId, from, to, category } = searchParams;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (category && expense.category !== category) {
      return false;
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const spentAtDate = new Date(expense.spentAt);

      if (spentAtDate < fromDate || spentAtDate > toDate) {
        return false;
      }
    }

    return true;
  });

  return filteredExpenses;
};

const getExpenseByID = (expenseID) => {
  const serchedExpense = expenses.find(expense => expense.id === expenseID);

  return serchedExpense || null;
};

const createExpense = (expenseData) => {
  const maxID = Math.max(...expenses.map(expense => expense.id));
  const newExpense = {
    expenseData,
    id: !maxID ? maxID + 1 : 1,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseID) => {
  expenses = expenses.filter(expense => expense.id !== expenseID);
};

const updateExpense = (expenseData, expenseID) => {
  const updatedExpense = getExpenseByID(expenseID);

  Object.assign(updatedExpense, expenseData);

  return updatedExpense;
};

module.exports = {
  resetExpenses,
  getFilteredExpense,
  getExpenseByID,
  createExpense,
  removeExpense,
  updateExpense,
};
