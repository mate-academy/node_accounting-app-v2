'use strict';

let expenses = [];
let currentId = 1;

const getAll = async (query = {}) => {
  const { userId, from, to, categories } = query;
  let result = [...expenses];

  if (userId !== undefined) {
    result = result.filter((item) => item.userId === Number(userId));
  }

  if (from) {
    result = result.filter((item) => new Date(item.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((item) => new Date(item.spentAt) <= new Date(to));
  }

  if (categories) {
    const list = []
      .concat(categories)
      .flatMap((c) => String(c).split(','))
      .filter(Boolean);

    result = result.filter((item) => list.includes(item.category));
  }

  return result;
};

const getById = async (id) => {
  return expenses.find((item) => item.id === id) || null;
};

const createExpense = async (expenseData) => {
  const newExpense = {
    id: currentId++,
    ...expenseData,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = async (id, body) => {
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  expenses[index] = {
    ...expenses[index],
    ...body,
  };

  return expenses[index];
};

const deleteById = async (id) => {
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);

  return true;
};

const removeAll = () => {
  expenses = [];
  currentId = 1;
};

const expensesService = {
  getAll,
  getById,
  createExpense,
  update,
  deleteById,
  removeAll,
};

module.exports = {
  expensesService,
};
