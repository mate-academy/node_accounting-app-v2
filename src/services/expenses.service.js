'use strict';

const { getNewId } = require('../helpers/getNewId.js');
const { getIndex } = require('../helpers/getIndex.js');

let expensesStorage = [];

function getExpenses(idUser, categories, from, to) {
  let expenses = expensesStorage;

  if (idUser) {
    expenses = expenses.filter(({ userId }) => (
      userId === +idUser
    ));
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => (
      new Date(from) <= new Date(spentAt)
      && new Date(to) >= new Date(spentAt)
    ));
  }

  return expenses;
}

function createExpense(body) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  const newExpense = {
    id: getNewId(expensesStorage),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesStorage.push(newExpense);

  return newExpense;
}

function getExpense(expenseId) {
  return expensesStorage.find(({ id }) => id === expenseId);
}

function deleteExpense(id) {
  const index = getIndex(expensesStorage, id);

  if (index >= 0) {
    return expensesStorage.splice(index, 1);
  }

  return false;
}

function editExpense(id, body) {
  const index = getIndex(expensesStorage, id);

  if (index >= 0) {
    expensesStorage[index] = Object.assign(expensesStorage[index], body);
    return expensesStorage[index];
  }

  return false;
}

function clearExpensesStorage() {
  expensesStorage = []
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  editExpense,
  clearExpensesStorage,
};
