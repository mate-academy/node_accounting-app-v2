'use strict';

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAll = () => expenses;

const getByUserId = (userId) => expenses.filter(item => item.userId === userId);

const getById = (id) => expenses.find(item => item.id === id);

const getByDate = (from, to) => {
  return expenses
    .filter(item => (item.spentAt >= from && item.spentAt <= to));
};

const getByCategory = (userId, categories) => {
  return expenses
    .filter(item => (item.userId === userId && item.category === categories));
};

const create = (expense) => {
  const id = expenses.length
    ? expenses[expenses.length - 1].id + 1
    : 0;

  const newExpense = {
    id,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(item => item.id !== id);
};

const update = (id, body) => {
  const expense = getById(id);

  Object.assign(expense, { ...body });

  return expense;
};

module.exports = {
  getAll,
  getByUserId,
  getById,
  getByDate,
  getByCategory,
  create,
  remove,
  update,
  clearExpenses,
};
