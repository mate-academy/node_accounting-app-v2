'use strict';

const { createId } = require('../utils/createId');

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (!isNaN(+userId)) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories && categories.length) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => Date.parse(expense.spentAt) >= Date.parse(from));
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => Date.parse(expense.spentAt) <= Date.parse(to));
  }

  return filteredExpenses;
};

const getExpense = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

const createExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) => {
  const newExpense = {
    id: createId(expenses),
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

const updateExpense = ({ id,
  dataToUpdate }) => {
  const foundExpense = getExpense(id);

  Object.assign(foundExpense, dataToUpdate);

  return foundExpense;
};

module.exports = {
  expenseService: {
    getInitial,
    getExpenses,
    getExpense,
    createExpense,
    deleteExpense,
    updateExpense,
  },
};
