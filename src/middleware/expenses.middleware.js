'use strict';

const usersSevice = require('./../services/users.service');
const expensesService = require('./../services/expenses.service');
const { isValidDate } = require('./../helpers');

const expenseIdRouteParam = (req, res, next, id) => {
  const expenseId = parseInt(id);

  if (Number.isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!expensesService.exists(expenseId)) {
    res.sendStatus(404);

    return;
  }

  next();
};

const expenseCreateRequestBody = (req, res, next) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isValidRequest = typeof userId === 'number'
                      && usersSevice.exists(userId)
                      && isValidDate(spentAt)
                      && typeof title === 'string'
                      && typeof amount === 'number'
                      && typeof category === 'string'
                      && (note ? typeof note === 'string' : true);

  if (!isValidRequest) {
    res.sendStatus(400);

    return;
  }

  next();
};

const expenseUpdateRequestBody = (req, res, next) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isValidRequest = (spentAt ? isValidDate(spentAt) : true)
                      && (title ? typeof title === 'string' : true)
                      && (amount ? typeof amount === 'number' : true)
                      && (category ? typeof category === 'string' : true)
                      && (note ? typeof note === 'string' : true);

  if (!isValidRequest) {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = {
  expenseIdRouteParam,
  expenseCreateRequestBody,
  expenseUpdateRequestBody,
};
