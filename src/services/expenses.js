'use strict';

const getId = require('../utils').getId;

let expenses = [];

function getAllExpenses(params) {
  const { userId, from, to, category } = params;
  const filtredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== Number(userId)) {
      return false;
    }

    if (category && !category.includes(expense.category)) {
      return false;
    }

    if (from && Date.parse(expense.spentAt) <= Date.parse(from)) {
      return false;
    }

    if (to && Date.parse(expense.spentAt) >= Date.parse(to)) {
      return false;
    }

    return true;
  });

  return filtredExpenses;
}

function deleteExpense(expenseId) {
  const filtredExpenses = expenses.filter(expense => (
    expense.id !== Number(expenseId)
  ));

  if (expenses.length === filtredExpenses.length) {
    return false;
  }

  expenses = filtredExpenses;

  return true;
}

function getExpense(expenseId) {
  return expenses.find(
    expense => expense.id === Number(expenseId)
  );
}

function createNewExpense(newValue) {
  let newId = 0;

  if (expenses.length) {
    newId = getId(expenses);
  }

  const newExpense = {
    id: newId,
    ...newValue,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense(expenseId, updatingValue) {
  const { spentAt, title, amount, category, note } = updatingValue;

  const findExpenses = expenses.find(expense => (
    expense.id === Number(expenseId)
  ));

  if (!findExpenses) {
    return null;
  }

  Object.assign(findExpenses, {
    spentAt, title, amount, category, note,
  });

  return findExpenses;
}

module.exports = {
  getAllExpenses,
  getExpense,
  deleteExpense,
  createNewExpense,
  updateExpense,
};
