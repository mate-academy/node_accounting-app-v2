'use strict';

const { createNewId } = require('../utils/createNewId');

let expenses = [];

const setInitialExpenses = () => {
  expenses = [];
};

function getAll(userId, categories, from, to) {
  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  } else if (categories) {
    expenses = expenses.filter(
      expense => categories.inclusdes(expense.category)
    );
  } else if (from && to) {
    expenses = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to
    );
  }

  return expenses;
};

function getById(expenseId) {
  const foundedExpense = expenses.find(expense => expense.id === expenseId);

  return foundedExpense || null;
};

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: createNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

function remove(expenseId) {
  expenses = expenses.filter(
    expense => expense.id !== expenseId
  );

  return expenses;
};

function update({ expenseId, spentAt, title, amount, category, note }) {
  const foundedExpense = expenses.find(expense => expense.id === expenseId);

  Object.assign(foundedExpense, spentAt, title, amount, category, note);

  return foundedExpense;
};

const expensesService = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitialExpenses,
};

module.exports = { expensesService };
