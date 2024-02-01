'use strict';

let expenses = [];

function getAll({ userId, categories, from, to }) {
  if (userId) {
    expenses = expenses.filter(e => e.id === Number(userId));
  }

  if (categories) {
    expenses = expenses.filter(e => e.category === categories);
  }

  if (from && to) {
    expenses = expenses.filter(
      e => new Date(e.spentAt).valueOf() >= new Date(from).valueOf()
        && new Date(e.spentAt).valueOf() <= new Date(to).valueOf()
    );
  }

  return expenses;
}

function getById(expensesId) {
  const foundExpenses = expenses.find(
    expense => expense.id === expensesId
  );

  return foundExpenses || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpenses = {
    id: expenses.length + 1,
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

function remove(expensesId) {
  expenses = expenses.filter(expense => expense.id !== Number(expensesId));
}

function update(updateObj) {
  const expense = getById(updateObj.id);

  Object.assign(expense, updateObj);

  return expense;
}

function reset() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  reset,
};
