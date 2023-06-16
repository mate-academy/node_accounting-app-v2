'use strict';

let expenses = [];

const getMax = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const maxId = Math.max(...array.map(({ id }) => id));

  return maxId + 1;
};

function getAll(userId, categories, from, to) {
  if (userId) {
    expenses = expenses.filter(expence => expence.userId === userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expence => expence.category === categories);
  }

  if (from && to) {
    expenses = expenses.filter(expence => {
      const expanseDate = new Date(expence.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return fromDate <= expanseDate && toDate > expanseDate;
    });
  }

  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function create(data) {
  const id = getMax(expenses);

  const newExpense = {
    id,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));

  return expenses;
}

function removeMany(ids) {
  if (!ids.every(getById)) {
    throw new Error();
  }
  expenses = expenses.filter(expense => !ids.includes(expense.id));
}

function update(expanseId, body) {
  const expense = getById(expanseId);

  Object.assign(expense, body);

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  removeMany,
};
