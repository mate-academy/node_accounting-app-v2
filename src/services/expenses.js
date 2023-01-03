'use strict';

let expenses = [];

function init() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  // eslint-disable-next-line no-console
  console.log(userId, category, from, to);

  if (userId) {
    const filteredExpenses = expenses.filter(expense =>
      (expense.userId === userId));

    return filteredExpenses;
  }

  if (category) {
    return expenses.filter(expense =>
      (expense.category === category));
  }

  if (from && to) {
    return expenses.filter(expense =>
      (expense.spentAt >= from && expense.spentAt <= to));
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(args) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = args;

  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
    id: expenses.length + 1,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ title, id }) {
  const expense = getById(id);

  Object.assign(expense, {
    title,
  });

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
