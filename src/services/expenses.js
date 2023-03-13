'use strict';

let expenses = [];

function initiate(initiateValue) {
  expenses = initiateValue;
}

function getAll(query) {
  let filteredExpenses = expenses;

  const { userId, categories, from, to } = query;

  const categoriesArr = Array.isArray(categories)
    ? categories
    : [categories];

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categoriesArr.includes(expense.category)
    ));
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(expense => (
      Date.parse(expense.spentAt) > Date.parse(from)
    ));
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(expense => (
      Date.parse(expense.spentAt) < Date.parse(to)
    ));
  }

  return filteredExpenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function create(userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const id = !expenses.length
    ? 1
    : Math.max(...expenses.map(expense => expense.id)) + 1;

  const newExpense = {
    id,
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
  expenses = expenses.filter(expense => (
    expense.id !== +expenseId
  ));
}

function update(id, obj) {
  const expense = getById(id);

  Object.assign(expense, obj);

  return expense;
}

module.exports = ({
  initiate,
  getAll,
  getById,
  create,
  remove,
  update,
});
