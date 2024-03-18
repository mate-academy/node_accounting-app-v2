'use strict';

const { getNewId } = require('../helpers/idsGenerator');

const expenses = [];

function clearAll() {
  expenses.length = 0;
}

function getAll({ userId, categories, from, to }) {
  let userExpenses = [...expenses];

  if (userId) {
    userExpenses = userExpenses.filter((exp) => exp.userId === +userId);
  }

  if (categories) {
    userExpenses = userExpenses.filter((exp) => {
      return categories.includes(exp.category);
    });
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    userExpenses = userExpenses.filter((exp) => {
      return (
        new Date(exp.spentAt) >= fromDate && new Date(exp.spentAt) <= toDate
      );
    });
  }

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
