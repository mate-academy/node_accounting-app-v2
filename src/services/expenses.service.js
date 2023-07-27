'use strict';

const { getNewId } = require('../helpers.js');

let expenses = [];

const intitExpenses = () => {
  expenses = [];
};

const getFiltered = (userId, from, to, categories) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter((expense) => (
      expense.userId === userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter((expense) => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = expenses.filter((expense) => (
      categories.includes(expense.category))
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  const foundExpense = expenses.find((expense) => expense.id === id);

  return foundExpense || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: getNewId(expenses),
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

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const update = (id, reqBody) => {
  const foundExpense = getById(id);

  const updatedExpense = {
    ...foundExpense,
    ...reqBody,
  };

  Object.assign(foundExpense, updatedExpense);

  return updatedExpense;
};

module.exports = {
  intitExpenses,
  getFiltered,
  getById,
  create,
  remove,
  update,
};
