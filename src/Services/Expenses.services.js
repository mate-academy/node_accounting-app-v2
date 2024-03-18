'use strict';

const { generateUniqueID } = require('../utils/IdGenerator');

const expenses = [];

const clearExpenses = () => {
  expenses.length = 0;
};

const postExpenses = (expenseData) => {
  const newExpense = {
    id: generateUniqueID(expenses),
    ...expenseData,
  };

  expenses.push(newExpense);

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
  const indexToDelete = expenses.findIndex((expense) => expense.userId === +id);

  if (indexToDelete !== -1) {
    expenses.splice(indexToDelete, 1);
  }
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
