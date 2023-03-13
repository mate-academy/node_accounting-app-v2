'use strict';

const { createId } = require('../utils/createId');

let expenses = [];

const getInitial = () => {
  expenses = [];
};

const getExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  filteredExpenses = filteredExpenses
    .filter(expense => {
      if (!isNaN(+userId) && expense.userId !== +userId) {
        return false;
      }

      if (categories
        && categories.length
        && !(categories.includes(expense.category))) {
        return false;
      }

      if (from && Date.parse(expense.spentAt) < Date.parse(from)) {
        return false;
      }

      if (to && Date.parse(expense.spentAt) > Date.parse(to)) {
        return false;
      }

      return true;
    });

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

const updateExpense = ({
  id,
  dataToUpdate,
}) => {
  const foundExpense = getExpense(id);

  Object.assign(foundExpense, dataToUpdate);

  return foundExpense;
};

module.exports = {
  getInitial,
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
