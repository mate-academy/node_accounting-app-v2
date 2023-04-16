'use strict';

const expenseServices = require('../services/expenses');
const validateData = require('../utils/expenses');

const getAll = (req, res) => {
  const expenses = expenseServices.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const isValid = validateData(req.body);

  if (!isValid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.update(expenseId, { ...req.body });

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
