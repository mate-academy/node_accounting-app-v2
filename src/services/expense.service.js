'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const filterByPeriod = (from, to) => {
  return expenses.filter(exp => {
    return exp.spentAt > from
    && exp.spentAt < to ? exp : null;
  });
};

const filterByCategory = (categories) => {
  return expenses.filter(exp => exp.category === categories);
};

const filterByUserId = (userId) => {
  return expenses.filter(exp => exp.userId === +userId);
};

const getById = (id) => {
  return expenses.find(exp => exp.id === +id);
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenses.length,
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

const update = (expense, title) => {
  return Object.assign(expense, { title });
};

const remove = (id) => {
  expenses = expenses.filter(exp => exp.id !== +id);
};

module.exports = {
  clearExpenses,
  getAll,
  filterByPeriod,
  filterByCategory,
  filterByUserId,
  getById,
  create,
  update,
  remove,
};
