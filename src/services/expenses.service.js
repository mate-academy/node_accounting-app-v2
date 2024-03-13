/* eslint-disable no-console */
'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const update = ({
  id,
  title,
  amount,
  category,
  note,
}) => {
  const expense = getById(id);

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clearExpenses,
};
