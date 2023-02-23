'use strict';

let expenses = [];

function clear() {
  expenses = [];
}

function getAll(userId, category, from, to) {
  let currentExpenses = expenses;

  if (userId) {
    currentExpenses = currentExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (category) {
    currentExpenses = currentExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    currentExpenses = currentExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    currentExpenses = currentExpenses
      .filter(expense => expense.spentAt <= to);
  }

  return currentExpenses;
};

function getbyId(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
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
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

function update({ id, data }) {
  const expense = getbyId(id);

  Object.assign(expense, data);

  return expense;
};

module.exports = {
  clear,
  getAll,
  getbyId,
  create,
  remove,
  update,
};
