'use strict';

let expenses = [];

function init() {
  expenses = [];
};

function getAllExpenses({
  userId,
  category,
  from,
  to,
}) {
  return expenses;
};

function createExpenses(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: Math.floor(Math.random() * 10),
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

function getExpense(id) {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

function updateExpense({ id, title }) {
  const expense = getExpense(+id);

  Object.assign(expense, { title });

  return expense;
};

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== +id);

  return expenses;
};

module.exports = {
  init,
  getAllExpenses,
  createExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
