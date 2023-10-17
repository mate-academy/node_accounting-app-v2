'use strict';

let expenses = [];
const { deleteItemById } = require('../utils/deleteItemById');
const { updateItem } = require('../utils/updateItem');
const { generateId } = require('../utils/generateId');

function resetExpenses() {
  expenses = [];
}

function getFilteredExpenses({
  userId: queryUserId,
  categories: queryCategories,
  from: queryFrom,
  to: queryTo,
}) {
  let filteredExpenses = expenses;

  if (queryUserId) {
    filteredExpenses = expenses.filter(({ userId }) => userId === queryUserId);
  }

  if (queryCategories) {
    filteredExpenses = expenses.filter(({ category }) => (
      queryCategories.includes(category)
    ));
  }

  if (queryFrom) {
    filteredExpenses = expenses.filter(({ spentAt }) => spentAt >= queryFrom);
  }

  if (queryTo) {
    filteredExpenses = expenses.filter(({ spentAt }) => spentAt <= queryTo);
  }

  return filteredExpenses;
}

function getExpenseById(expenseId) {
  return expenses.find(({ id }) => id === expenseId);
}

function createExpense(data) {
  const id = generateId();
  const createdExpense = {
    id,
    ...data,
  };

  expenses.push(createdExpense);

  return createdExpense;
}

function deleteExpense(id) {
  deleteItemById(expenses, id);
}

function updateExpense(data) {
  return updateItem(expenses, data);
}

module.exports = {
  resetExpenses,
  getFilteredExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  createExpense,
};
