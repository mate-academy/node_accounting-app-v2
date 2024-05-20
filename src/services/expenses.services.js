const getId = require('../utils/getMaxId');

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const filterExpenses = (allExpenses, { userId, categories, from, to }) => {
  return allExpenses.filter((item) => {
    const matchesUserId = userId ? item.userId === Number(userId) : true;
    const matchesCategory = categories ? item.category === categories : true;
    const matchesFrom = from ? new Date(item.spentAt) >= new Date(from) : true;
    const matchesTo = to ? new Date(item.spentAt) <= new Date(to) : true;

    return matchesUserId && matchesCategory && matchesFrom && matchesTo;
  });
};

const getAll = (data) => {
  return filterExpenses(expenses, data);
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
