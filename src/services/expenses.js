'use strict';

let expenses = [];

const getFilteredExpenses = (searchParams) => {
  const {
    userId,
    category,
    from,
    to,
  } = searchParams;

  return expenses
    .filter(expense => {
      if (userId && expense.userId !== +userId) {
        return;
      }

      if (category && category !== expense.category) {
        return;
      }

      if (from && new Date(expense.spentAt) < new Date(from)) {
        return;
      }

      if (to && new Date(expense.spentAt) > new Date(to)) {
        return;
      }

      return true;
    });
};

const getExpenses = () => {
  return expenses;
};

const addExpense = (expenseData) => {
  const maxId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;

  const newExpense = {
    id: maxId + 1,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getOneExpense = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId);
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const changeExpense = (expenseId, expenseData) => {
  const foundedExpense = getOneExpense(+expenseId);

  Object.assign(foundedExpense, expenseData);

  return foundedExpense;
};

module.exports = {
  getFilteredExpenses,
  getExpenses,
  addExpense,
  getOneExpense,
  deleteExpense,
  changeExpense,
};
