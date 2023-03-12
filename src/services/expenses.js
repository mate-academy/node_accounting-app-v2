'use strict';

let expenses = [];

let expenseIds = 0;

function serverReload() {
  expenses = [];
  expenseIds = 0;
};

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  expenseIds++;

  const newExpense = {
    id: expenseIds,
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

function remove(expenseId) {
  expenses = expenses.filter(user => user.id !== expenseId);
}

function update({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expense = getById(id);

  Object.assign(expense, {
    spentAt, title, amount, category, note,
  });

  return expense;
}

module.exports = {
  serverReload,
  getAll,
  getById,
  create,
  remove,
  update,
};
