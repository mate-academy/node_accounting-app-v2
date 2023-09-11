'use strict';

const { generateRandomId } = require('../helpers/generateRandomId');

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundedExpense = expenses.find((expense) => expense.id === +expenseId);

  return foundedExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const minId = 1;
  const maxId = 1000;

  const newExpense = {
    id: generateRandomId(minId, maxId),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
}

function update(expenseId, expenseData) {
  const expense = getById(expenseId);

  Object.assign(expense, expenseData);

  return expense;
}

function removeAllExpenses() {
  expenses = [];
}

const expenseService = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeAllExpenses,
};

module.exports = expenseService;
