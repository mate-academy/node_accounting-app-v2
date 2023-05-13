'use strict';

const { v4: uuidv4 } = require('uuid');

let expenses = [];

function initExpenses() {
  expenses = [];
}

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
}

function create(data) {
  const newExpense = {
    id: uuidv4(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function update(id, fieldsToUpdate) {
  const expense = getById(id);

  Object.assign(expense, { ...fieldsToUpdate });

  return expense;
}

function getAllForUser(userId) {
  return expenses.filter(expense => expense.userId === userId);
}

function getAllForCategory(expencesList, category) {
  return expencesList.filter(expense => expense.category === category);
}

function getAllBetweenDates(from, to) {
  return expenses.filter(expense => {
    const timestamp = new Date(expense.spentAt).getTime();

    return (timestamp >= from && timestamp <= to);
  });
}

module.exports = {
  initExpenses,
  getAll,
  getById,
  create,
  remove,
  update,
  getAllForUser,
  getAllForCategory,
  getAllBetweenDates,
};
