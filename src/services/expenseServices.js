'use strict';

const { findMaxID } = require('../utils/createNewID');

let expenses = [];

function resetExpenses() {
  expenses = [];
}

function getExpenses(userId, categories, from, to) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => +expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => (
        expense.spentAt > from && expense.spentAt < to
      ));
  }

  if (from && !to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to && !from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return filteredExpenses;
};

function getExpenseByUserId(userId) {
  const foundExpense = expenses.find(expense => expense.userId === +userId);

  return foundExpense;
}

function getExpenseById(id) {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense;
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = {
    id: findMaxID(expenses) + 1,
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

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

function update(expense, req) {
  Object.assign(expense, req.body);

  return expense;
}

module.exports = {
  getExpenses,
  getExpenseByUserId,
  getExpenseById,
  create,
  remove,
  update,
  resetExpenses,
};
