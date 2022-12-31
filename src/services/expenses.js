'use strict';

let expenses = [];

function clear() {
  expenses = [];
};

function getAll(userId = null, category = null, from = null, to = null) {
  let visibleExpenses = expenses;

  if (userId) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    visibleExpenses = visibleExpenses
      .filter(expense => expense.spentAt < to);
  }

  return visibleExpenses;
};

function getById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addOne(newExpanse) {
  const maxId = Math.max(...expenses.map(user => user.id));

  newExpanse.id = maxId > 0 ? maxId + 1 : 1;

  expenses.push(newExpanse);

  return newExpanse;
}

function deleteOne(expenseId) {
  expenses = expenses.filter(expanse => expanse.id !== Number(expenseId));
}

function updateOne(expenseId, newData) {
  const expense = getById(expenseId);

  Object.assign(expense, newData);

  return expense;
}

module.exports = {
  clear,
  getAll,
  getById,
  addOne,
  deleteOne,
  updateOne,
};
