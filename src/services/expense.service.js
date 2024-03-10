'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((item) => item.id === id) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const newExpens = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);

  return newExpens;
};

const remove = (id) => {
  expenses = expenses.filter((item) => item.id !== id);
};

const update = ({ id, spentAt, title, amount, category, note }) => {
  const expenseToUpdate = getById(id);

  Object.assign(expenseToUpdate, {
    spentAt, title, amount, category, note,
  });

  return expenseToUpdate;
};

const filter = (id, categories, dateFrom, dateTo) => {
  const filteredExpenses = (getAll()).filter((item) => {
    if (!Number.isNaN(id) && item.userId !== id) {
      return false;
    }

    if (categories && !categories.includes(item.category)) {
      return false;
    }

    if (dateFrom && new Date(item.spentAt) < new Date(dateFrom)) {
      return false;
    }

    if (dateTo && new Date(item.spentAt) > new Date(dateTo)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
  filter,
};
