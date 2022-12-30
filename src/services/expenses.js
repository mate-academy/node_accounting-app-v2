'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getAllWithQuery(userId = '', category = '', from = '', to = '') {
  let expensesToShow = expenses;

  if (userId.length) {
    expensesToShow = expensesToShow
      .filter(expense => expense.userId === Number(userId));
  }

  if (category.length) {
    expensesToShow = expensesToShow
      .filter(expense => expense.category === category);
  }

  if (from.length) {
    expensesToShow = expensesToShow
      .filter(expense => expense.spentAt > from);
  }

  if (to.length) {
    expensesToShow = expensesToShow
      .filter(expense => expense.spentAt < to);
  }

  return expensesToShow;
}

function getOne(expenseId) {
  const foundExpense = expenses
    .find(expense => expense.id === Number(expenseId));

  return foundExpense || null;
}

function addOne(body) {
  const maxId = Math.max(...expenses.map(expense => expense.id));

  const newExpense = {
    id: maxId > 0 ? maxId + 1 : 1,
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteOne(expenseId) {
  expenses = expenses.filter(expense => expense.id !== Number(expenseId));
}

function updateOne(expenseId, body) {
  const foundExpense = getOne(expenseId);

  Object.assign(foundExpense, body);

  return foundExpense;
}

module.exports.expensesService = {
  getAll,
  getAllWithQuery,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
