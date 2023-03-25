'use strict';

let expenses = [];

function getAll(userId, category, from, to) {
  if (!expenses.length) {
    return [];
  }

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    expenses = expenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    expenses = expenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses
      .filter(expense => expense.spentAt <= to);
  }

  return expenses;
}

function getOne(expensesId) {
  const foundExpense = expenses.find(expense => (
    expense.id === +expensesId
  ));

  return foundExpense || null;
}

function create(title, category, note, userId, spentAt, amount) {
  const newExpense = {
    id: expenses.length,
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

function remove(expensesId) {
  expenses = expenses.filter(
    expense => expense.id !== +expensesId);
}

function update(items, expensesId) {
  const expense = getOne(expensesId);

  Object.assign(expense, { ...items });

  return expense;
}

function clear() {
  expenses = [];
};

module.exports = {
  getAll, getOne, create, remove, update, clear,
};
