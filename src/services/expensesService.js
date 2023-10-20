'use strict';

let expenses = [];
const { deleteItemById } = require('../utils/deleteItemById');
const { updateItem } = require('../utils/updateItem');
const { generateId } = require('../utils/generateId');

function resetExpenses() {
  expenses = [];
}

function getAllExpenses() {
  return expenses;
}

function getFilteredExpenses({
  userId: queryUserId,
  categories: queryCategories,
  from: queryFrom,
  to: queryTo,
}) {
  let filteredExpenses = expenses;

  if (queryUserId || queryCategories.length || queryFrom || queryTo) {
    filteredExpenses = expenses.filter(({ userId, category, spentAt }) => {
      if (queryUserId && queryUserId !== userId) {
        return false;
      }

      if (queryCategories.length && !queryCategories.includes(category)) {
        return false;
      }

      if (queryFrom && spentAt < queryFrom) {
        return false;
      }

      if (queryTo && spentAt > queryTo) {
        return false;
      }

      return true;
    });
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
  expenses = deleteItemById(expenses, id);
}

function updateExpense(data) {
  return updateItem(expenses, data);
}

module.exports = {
  getAllExpenses,
  resetExpenses,
  getFilteredExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  createExpense,
};
