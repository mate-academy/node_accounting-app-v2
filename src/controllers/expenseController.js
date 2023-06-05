'use strict';

const expenseServices = require('../services/expenseService');
const usersService = require('../services/usersService');

const getAll = (req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.sendStatus(400);

    return;
  }

  const expenses = expenseServices.getAll(searchParams);

  res.statusCode = 200;
  res.send(expenses);
};

const getExpensById = (req, res) => {
  const { id } = req.params;

  const requiredExpense = expenseServices.findExpenseById(id);

  if (!requiredExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(requiredExpense);
};

const add = (req, res) => {
  const params = req.body;

  const foundUser = usersService.findUserById(params.userId);

  if (!foundUser || !params) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.createExpense(params);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const params = req.body;
  const { id } = req.params;

  const requiredExpense = expenseServices.findExpenseById(id);

  if (!requiredExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.updateExpense(id, params);

  res.send(requiredExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const requiredExpense = expenseServices.findExpenseById(id);

  if (!requiredExpense) {
    res.sendStatus(404);

    return;
  }

  if (isNaN(Number(id))) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getExpensById,
  add,
  update,
  remove,
};
