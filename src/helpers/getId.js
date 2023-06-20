'use strict';

const { GenerateId } = require('./generateId');

const userId = new GenerateId(50);
const expensesId = new GenerateId(50);

module.exports = {
  userId,
  expensesId,
};
