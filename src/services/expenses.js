'use strict';

let nextExpenseId = 1;

function getAllExpenses(expenses) {
  return expenses;
}

function filterByData(from, to, expenses) {
  const foundExpense = expenses.filter(
    (expense) => expense.spentAt > from
      && expense.spentAt < to
  );

  return foundExpense;
}

function filterByCategory(userId, category, expenses) {
  const foundExpense = expenses.filter(
    (expense) => expense.userId === +userId
      && expense.category === category
  );

  return foundExpense;
}

function filterById(userId, expenses) {
  const foundExpense = expenses.filter(
    (expense) => expense.userId === +userId
  );

  return foundExpense;
}

function getExpenseById(expenseId, expenses) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function createExpense(body, expenses) {
  const newExpense = {
    id: nextExpenseId++,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

function removeExpense(expenseId, expenses) {
  return expenses.filter(expense => expense.id !== +expenseId);
}

function updateExpense(foundExpense, title) {
  Object.assign(foundExpense, { title });
}

module.exports = {
  getAllExpenses,
  filterByData,
  filterByCategory,
  filterById,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
