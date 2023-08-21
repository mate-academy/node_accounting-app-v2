'use strict';

let expenses = [];
let currentId = 1;

function getAll({
  userId,
  categories,
  from,
  to,
}) {
  if (userId) {
    expenses = expenses.filter((expense) =>
      expense.userId === (+userId)
    );
  }

  if (categories) {
    expenses = expenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    expenses = expenses.filter((expense) =>
      (expense.spentAt >= from && expense.spentAt <= to)
    );
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => +expense.id === +expenseId);

  return foundExpense || null;
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
    id: currentId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  currentId++;

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => +expense.id !== +expenseId);
};

function update(expenseId, body) {
  const expense = getById(expenseId);

  Object.assign(expense, body);

  return expense;
}

function removeAll() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll,
};
