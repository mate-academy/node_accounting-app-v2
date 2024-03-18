'use strict';

const { getNewId } = require('../helpers/idsGenerator');

const expenses = [];

function clearAll() {
  expenses.length = 0;
}

function getAll({ userId, categories, from, to }) {
  const userExpenses = [...expenses].filter((exp) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const spentAt = new Date(exp.spentAt);

    if (userId && exp.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(exp.category)) {
      return false;
    }

    if (fromDate && spentAt < fromDate) {
      return false;
    }

    if (toDate && spentAt > toDate) {
      return false;
    }

    return true;
  });

  return userExpenses;
}

function getById(id) {
  return expenses.find((exp) => exp.id === id) || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
  const expense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function update(body, id) {
  const expenseToUpdate = getById(id);

  Object.assign(expenseToUpdate, body);

  expenses.push(expenseToUpdate);

  return expenseToUpdate;
}

function remove(id) {
  const index = expenses.findIndex((exp) => exp.id === id);

  expenses.splice(index, 1);
}

module.exports = {
  clearAll,
  getAll,
  getById,
  create,
  update,
  remove,
};
