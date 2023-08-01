'use strict';

const expenseService = require('../services/expense');
const { createErrorStatus } = require('../entity/createErrorStatus');
const { getById: getUserById } = require('../services/user');

function getAll(req, res) {
  const expenses = expenseService.getAll(req.query);

  res.status(200).send(expenses);
};

function getOne(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 400, 'expenseId');

    return;
  }

  const expenses = expenseService.getById(expenseId);

  if (!expenses) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  res.status(200).send(expenses);
};

function add(req, res) {
  const hasRequireParams = expenseService.checkParams(req.body);

  if (hasRequireParams.length) {
    createErrorStatus(res, 400, hasRequireParams);
  }

  const user = getUserById(req.body.userId);

  if (!user) {
    res.status(400).send('User not found');
  }

  const newExpense = expenseService.create(req.body);

  res.status(201).send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 400, 'expenseId');

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  const reqParams = req.body;

  if (!Object.keys(reqParams).length) {
    res.status(400).send('No params');
  }

  const updatedExpense = expenseService.update({
    id: +expenseId,
    ...reqParams,
  });

  res.status(200).send(updatedExpense);
}

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
