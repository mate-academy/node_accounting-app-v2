'use strict';

let expenses = [];
let id = 1;

function getAll({ userId, category, from, to }) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense => (
      category.includes(expense.category)
    ));
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(expense => (
      new Date(from) < new Date(expense.spentAt)
    ));
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(expense => (
      new Date(to) > new Date(expense.spentAt)
    ));
  }

  return filteredExpenses;
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
  note
) {
  const newExpense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  id++;

  expenses.push(newExpense);

  return newExpense;
}

function update(
  expenseId,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, {
    spentAt: spentAt || foundExpense.spentAt,
    title: title || foundExpense.title,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  });

  return foundExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function deleteAll() {
  expenses = [];
  id = 1;
}

module.exports = {
  getAll,
  getById,
  deleteAll,
  create,
  update,
  remove,
};
