'use strict';

const expenses = [];
let lastId = 0;

function getAll(filters = {}) {
  let result = [...expenses];
  const { userId, categories, category, from, to } = filters;

  if (userId !== undefined) {
    result = result.filter((item) => item.userId === +userId);
  }

  const targetCategory = categories || category;

  if (targetCategory !== undefined) {
    const wanted = Array.isArray(targetCategory)
      ? targetCategory
      : [targetCategory];

    result = result.filter((item) => wanted.includes(item.category));
  }

  if (from !== undefined) {
    result = result.filter((item) => new Date(item.spentAt) >= new Date(from));
  }

  if (to !== undefined) {
    result = result.filter((item) => new Date(item.spentAt) <= new Date(to));
  }

  return result;
}

function getByCategory(cat) {
  return expenses.filter((item) => item.category === cat);
}

function getById(id) {
  return expenses.find((item) => item.id === +id) || null;
}

function getByUserId(userId) {
  return expenses.filter((item) => item.userId === +userId);
}

function createExpense(expense) {
  lastId++;

  const newExpense = { ...expense, id: lastId };

  expenses.push(newExpense);

  return newExpense;
}

function deleteById(id) {
  const index = expenses.findIndex((item) => item.id === +id);

  if (index === -1) {
    return null;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
}

function update(id, body) {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  return Object.assign(expense, body);
}

function resetExpenses() {
  expenses.length = 0;
  lastId = 0;
}

const expensesService = {
  getAll,
  getByCategory,
  getById,
  getByUserId,
  createExpense,
  deleteById,
  update,
  resetExpenses,
};

module.exports = {
  expensesService,
  getAll,
  getByCategory,
  getById,
  getByUserId,
  createExpense,
  deleteById,
  update,
  reset: resetExpenses,
  resetExpenses,
};
