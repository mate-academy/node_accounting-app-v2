'use strict';

const { getUsers, getUserById, createUser } = require('./users');
const { getExpenses, getExpenseById, createExpense } = require('./expenses');

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getExpenses,
  getExpenseById,
  createExpense,
};
