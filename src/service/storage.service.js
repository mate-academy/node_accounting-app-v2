'use strict';

const { initializeUsers } = require('./user.service');
const { initializeExpenses } = require('./expense.service');

const initializeStorage = () => {
  initializeUsers();
  initializeExpenses();
};

module.exports = { initializeStorage };
