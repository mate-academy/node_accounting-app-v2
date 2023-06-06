'use strict';

let expenses = [];

const filterExpanses = (expense, queryParams) => {
  const { userId, categories, from, to } = queryParams;

  const isValidUserId = !userId || expense.userId === Number(userId);
  const isValidCategories = !categories
    || categories.includes(expense.category);
  const isValidFromDate = !from || new Date(expense.spentAt) >= new Date(from);
  const isValidToDate = !to || new Date(expense.spentAt) <= new Date(to);

  return isValidUserId && isValidCategories && isValidFromDate && isValidToDate;
};

const getAll = (params) => {
  const filteredExpenses = expenses
    .filter(expense => filterExpanses(expense, params));

  return filteredExpenses;
};

function getExpensById(expensId) {
  const foundExpens = expenses.find(expens => expens.id === Number(expensId));

  return foundExpens || null;
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const id = expenses.length
    ? Number(Math.max(...expenses.map((expens) => expens.id)) + 1)
    : 1;

  const newExpens = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpens);

  return newExpens;
}

function remove(expensId) {
  expenses = expenses.filter(expens => expens.id !== Number(expensId));
}

function update(
  id,
  spentAt,
  title,
  amount,
  category,
  note
) {
  const expens = getExpensById(id);

  Object.assign(expens, {
    spentAt, title, amount, category, note,
  });

  return expens;
}

function reset() {
  expenses = [];
}

module.exports = {
  getAll,
  getExpensById,
  create,
  remove,
  update,
  reset,
};
