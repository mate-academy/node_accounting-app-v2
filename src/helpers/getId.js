'use strict';

const { GenerateId } = require('./generateId');

const userId = new GenerateId(50);
const expensesId = new GenerateId(50);

module.exports = {
  getUserId: userId.getId.bind(userId),
  addUserFreeId: userId.addFreeId.bind(userId),
  getExpensesId: expensesId.getId.bind(expensesId),
  addExpensesFreeId: userId.addFreeId.bind(expensesId),
};
