const { v4: uuidv4 } = require('uuid');

let expenses = [];

const getAll = (params) => {
  const { userId, categories, from, to } = params;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (item) => item.userId === userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((item) =>
      categories.includes(item.category),
    );
  }

  if (from) {
    const normalizedFrom = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      (item) => new Date(item.spentAt) >= normalizedFrom,
    );
  }

  if (to) {
    const normalizedTo = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (item) => new Date(item.spentAt) <= normalizedTo,
    );
  }

  return filteredExpenses;
};

const getById = (id) => {
  const expense = expenses.find((item) => item.id === id);

  return expense;
};

const create = (data) => {
  const newExpense = {
    id: uuidv4(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, data) => {
  const expense = getById(id);

  Object.assign(expense, data);

  return expense;
};

const remove = (id) => {
  const removedExpense = getById(id);

  expenses = expenses.filter((item) => item.id !== id);

  return removedExpense;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
