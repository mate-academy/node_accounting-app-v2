'use strict';

const USER_ID = 'userId';
const FROM = 'from';
const TO = 'to';
const CATEGORIES = 'categories';

let expenses = [];

function isPasses(expenseValue, searchValue) {
  if (Array.isArray(searchValue)) {
    return searchValue.includes(`${expenseValue}`);
  }

  return `${expenseValue}` === `${searchValue}`;
}

function getExpensesByQuery(searchQuery) {
  let filteredExpenses = expenses;

  for (const [query, searchValue] of Object.entries(searchQuery)) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      switch (query) {
        case USER_ID:
          return isPasses(expense.userId, searchValue);

        case FROM:
          return Date.parse(expense.spentAt) >= Date.parse(searchValue);

        case TO:
          return Date.parse(expense.spentAt) < Date.parse(searchValue);

        case CATEGORIES:
          return isPasses(expense.category, searchValue);

        default:
          break;
      }
    });
  }

  return filteredExpenses;
}

function getAll(searchQuery) {
  const filteredExpenses = getExpensesByQuery(searchQuery);

  return filteredExpenses;
};

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
};

function create(expenseData) {
  const { userId, spentAt, title, amount, category, note } = expenseData;

  const expenseIds = expenses.map(expense => expense.id);

  const maxId = Math.max(...expenseIds, 0) + 1;

  const newExpense = {
    id: maxId,
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

function update(expenseId, fieldsToUpdate) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, fieldsToUpdate);

  return foundExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function clear() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  clear,
};
