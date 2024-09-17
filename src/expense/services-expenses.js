'use strict';

const usersServices = require('../users/services-users.js');

let expenses = [];

const expensesField = ['userId', 'spendAt', 'title',
  'amount', 'category', 'note'];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  return expenses.find(espense => espense.id === +expenseId);
}

function isIdNormal(id) {
  return !Number(id) && +id !== 0;
}

function create(data) {
  const { userId } = data;

  const findedUser = usersServices.getById(userId);

  if (!findedUser) {
    return null;
  }

  const id = expenses.length > 0
    ? Math.max(...expenses.map(expense => expense.id)) + 1
    : 0;

  const newExpense = Object.assign({ id }, data);

  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  const previousLength = expenses.length;

  expenses = expenses.filter(expense => expense.id !== +id);

  if (previousLength === expenses.length) {
    return false;
  }

  return true;
}

module.exports = {
  getAll,
  getById,
  isIdNormal,
  expensesField,
  create,
  remove,
};
