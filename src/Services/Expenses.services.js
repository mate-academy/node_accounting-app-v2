'use strict';

const { generateUniqueID } = require('../utils/IdGenerator');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const postExpenses = (expenseData) => {
  const newExpense = {
    id: generateUniqueID(expenses),
    ...expenseData,
  };

  expenses = [...expenses, newExpense];

  return newExpense;
};

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.userId !== +id);
};

const patchExpense = (id, newExpense) => {
  Object.assign(getExpense(id), newExpense);

  return getExpense(id);
};

module.exports = {
  clearExpenses,
  postExpenses,
  getAllExpenses,
  getExpense,
  deleteExpense,
  patchExpense,
};
