'use strict';

const { generateItem } = require('../utils/generateItem');

const expenses = [];

function restart() {
  expenses.length = 0;
}

function getAll() {
  return expenses;
}

function getById(id) {
  return expenses.find(item => item.id === id);
}

function getByUserId(userId) {
  return expenses.filter(item => item.userId === userId);
}

function getByDate(from, to) {
  return expenses.filter(item => item.spentAt >= from && item.spentAt <= to);
};

function getByCategory(userId, categories) {
  return expenses.filter(item => item.userId === userId
    && categories.includes(item.category));
};

function create(expense) {
  const newExpense = generateItem(expense);

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  const index = expenses.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  return expenses.splice(index, 1);
}

function update(expense, toUpdate) {
  Object.assign(expense, toUpdate);

  return expense;
}

module.exports = {
  restart,
  getAll,
  getById,
  getByUserId,
  getByDate,
  getByCategory,
  create,
  remove,
  update,
};
