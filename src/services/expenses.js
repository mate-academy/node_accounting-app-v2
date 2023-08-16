'use strict';

const { generateId } = require('../helpers/generateId');

let expenses = [];

function getAll({ userId, categories, from, to }) {
  expenses = expenses.filter((expense) => {
    const byUserId = userId ? expense.userId === Number(userId) : true;
    const byCategory = categories
      ? categories.includes(expense.category)
      : true;
    const byDate
      = from && to ? expense.spentAt >= from && expense.spentAt <= to : true;

    return byUserId && byCategory && byDate;
  });

  return expenses;
}

function getOne(ExpensesId) {
  return expenses.find((record) => record.id === Number(ExpensesId));
}

function createOne({ userId, spentAt, title, amount, category, note = '' }) {
  const newExpenses = {
    id: generateId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function updateOne(ExpensesId, body) {
  const foundExpenses = getOne(ExpensesId);

  Object.assign(foundExpenses, body);

  return foundExpenses;
}

function deleteOne(ExpenseId) {
  expenses = expenses.filter((record) => record.id !== Number(ExpenseId));
}

function deleteAllExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  deleteAllExpenses,
};
