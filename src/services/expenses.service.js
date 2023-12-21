'use strict';

let expenses = [];

const getAll = () => {
  return expenses;
};

const getByUser = (userId) => {
  return expenses.filter(expense => expense.userId === userId);
};

const getByCategory = (categories) => {
  return expenses.filter(expense => categories.includes(expense.category));
};

const getByPeriod = (from, to) => {
  return expenses.filter(expense => expense.spentAt > from
    && expense.spentAt < to);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const newExpense = {
    id: expenses.length,
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

const getById = (id) => {
  return expenses.find(expense => expense.id === Number(id)) || null;
};

const deleteById = (id) => {
  expenses = expenses.filter(expense => expense.id !== Number(id));
};

const update = ({ id, title }) => {
  const currentExpense = expenses.find(expense =>
    expense.id === Number(id));

  Object.assign(currentExpense, { title });

  return currentExpense;
};

const clearAll = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getByUser,
  getByCategory,
  getByPeriod,
  create,
  getById,
  deleteById,
  update,
  clearAll,
};
