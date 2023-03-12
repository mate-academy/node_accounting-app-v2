'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const query = req.query;
  const expenses = expenseService.getAll(query);

  res.send(expenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createNew = (req, res) => {
  const expenseToCreate = req.body;

  if (!expenseToCreate.title) {
    res.sendStatus(400);

    return;
  }

  const userId = req.body.userId;
  const findUser = userService.getById(+userId);

  if (!findUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createNew(expenseToCreate);

  res.status(201);
  res.send(newExpense);
};

const deleteById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expenseService.deleteById(+expenseId);
  res.sendStatus(204);
};

const updateById = (req, res) => {
  const { expenseId } = req.params;
  const expense = req.body;

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expenseService.updateById(+expenseId, expense);
  res.send(expenseService.getById(+expenseId));
};

module.exports = {
  getAll,
  getById,
  createNew,
  deleteById,
  updateById,
};
