'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getFiltered = (userId, category, from, to) => {
  let filteredExpenses = [...expenses];

  const filterByUserId = (expense) => {
    return !userId || expense.userId === userId;
  };

  const filterByCategory = (expense) => {
    return !category || category.includes(expense.category);
  };

  const filterByDateRange = (expense) => {
    const expenseDate = new Date(expense.spentAt);
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    return (!fromDate || expenseDate >= fromDate)
      && (!toDate || expenseDate <= toDate);
  };

  filteredExpenses = filteredExpenses
    .filter(filterByUserId)
    .filter(filterByCategory)
    .filter(filterByDateRange);

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(({ id }) => id === expenseId);

  return foundExpense || null;
};

const add = (expenseData) => {
  const maxId = Math.max(...expenses.map(expense => expense.id), 0);
  const newId = maxId + 1;

  const newExpense = {
    id: newId,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (expenseId) => {
  expenses = expenses.filter(({ id }) => id !== expenseId);
};

const updateExpense = (expenseId, expenseNewData) => {
  const expenseIndex = expenses.findIndex(({ id }) => id === expenseId);

  if (!expenseIndex) {
    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...expenseNewData,
    };

    return expenses[expenseIndex];
  }

  return null;
};

module.exports = {
  resetExpenses,
  getFiltered,
  getById: getById,
  add,
  removeExpense,
  updateExpense,
};
