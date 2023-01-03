'use strict';

let expenses = [];

function init() {
  expenses = [];
}

function getNewId() {
  if (!expenses.length) {
    return 1;
  }

  const maxId = expenses.reduce((prev, expense) => (
    Math.max(prev, expense.id)
  ), 0);

  return maxId + 1;
}

function getAll(userId, category, from, to) {
  let filteredExpenses = [...expenses];

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.category === category));
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.userId === +userId));

    return filteredExpenses;
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      (expense.spentAt >= from && expense.spentAt <= to));
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(expenseDetails) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = expenseDetails;

  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: getNewId(),
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ title, id }) {
  const expense = getById(id);

  Object.assign(expense, { title });

  return expense;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
