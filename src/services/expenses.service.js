'use strict';

const expenses = [];

const clearExpenses = () => {
  expenses.length = 0;
};

const getAll = () => expenses;

const getByUserId = (userId) => expenses.filter(item => item.userId === userId);

const getById = (id) => expenses.find(item => item.id === id);

const getByDate = (from, to) => {
  return expenses.filter(item => item.spentAt >= from && item.spentAt <= to);
};

const getByCategory = (userId, categories) => {
  return expenses.filter(item => item.userId === userId
    && categories.includes(item.category));
};

const create = (expense) => {
  const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 0;

  const newExpense = {
    id,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses.splice(expenses.findIndex(item => item.id === id), 1);
};

const update = (id, body) => {
  const expense = getById(id);

  if (expense) {
    Object.assign(expense, { ...body });
  }

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
