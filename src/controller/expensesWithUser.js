'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const add = (req, res) => {
  const {
    userId = null,
    spentAt = null,
    title = null,
    amount = null,
    category = null,
    note = null,
  } = req.body;

  const hasAllProperties = (
    typeof spentAt === 'string'
    && typeof userId === 'number'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string'
    && typeof note === 'string'
  );

  const havePropertiesValue = (
    spentAt !== ''
    && title !== ''
    && category !== ''
    && note !== ''
  );

  const userById = userService.getOne(userId);

  if (!hasAllProperties || !havePropertiesValue || !userById) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.add(req.body);

  res.status(201);
  res.send(newExpense);
};

module.exports = {
  add,
};
