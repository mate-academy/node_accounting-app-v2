const getId = require('../utils/getMaxId');

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const getAll = (data) => {
  const { userId, categories, from, to } = data;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.userId === Number(userId),
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter((item) => {
      return new Date(item.spentAt) >= new Date(from);
    });
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter((item) => {
      return new Date(item.spentAt) <= new Date(to);
    });
  }

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((item) => item.id === Number(id)) || null;
};

const createExpenses = (data) => {
  const newExpenses = {
    id: getId.getCreateMaxId(expenses),
    ...data,
    note: data.note || '',
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const updateExpenses = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, { ...data });

  return expense;
};

const deleteExpenses = (id) => {
  expenses = expenses.filter((item) => item.id !== Number(id));
};

module.exports = {
  initExpenses,
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  deleteExpenses,
};
