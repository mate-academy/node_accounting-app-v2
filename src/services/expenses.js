'use strict';

let nextId = 1;
let expences = [];

function getExpenses(userId, categories, from, to) {
  let res = [...expences];

  if (userId) {
    res = res.filter(expence => userId === expence.userId.toString());
  }

  if (categories) {
    if (Array.isArray(categories)) {
      res = res.filter(({ category }) => categories.includes(category));
    } else {
      res = res.filter(({ category }) => categories === category);
    }
  }

  if (from) {
    const dateFrom = new Date(from);

    res = res.filter(({ spentAt }) => dateFrom <= new Date(spentAt));
  }

  if (to) {
    const dateTo = new Date(to);

    res = res.filter(({ spentAt }) => dateTo >= new Date(spentAt));
  }

  return res;
}

function addExpense(data) {
  const newExpence = {
    id: nextId++,
    ...data,
  };

  expences.push(newExpence);

  return newExpence;
}

function getExpenseById(expenseId) {
  return expences.find(({ id }) => expenseId === id.toString());
}

function removeExpenseById(expenseId) {
  expences = expences.filter(({ id }) => expenseId !== id.toString());

  return expences;
}

function patchExpense(foundExpense, changes) {
  Object.assign(foundExpense, changes);

  return foundExpense;
}

function resetExpenses() {
  expences = [];
}

module.exports = {
  getExpenses,
  addExpense,
  getExpenseById,
  removeExpenseById,
  patchExpense,
  resetExpenses,
};
