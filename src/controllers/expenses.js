'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');
const { ApiError } = require('../exceptions/ApiError');

const getAll = (req, res) => {
  const expenses = expensesService.getMany(req.query);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    throw ApiError.NotFound();
  }

  res.send(expense);
};

const add = (req, res) => {
  const data = req.body;
  const hasUser = Boolean(usersService.getById(data.userId));

  if (!hasUser) {
    throw ApiError.BadRequest();
  }

  const expense = expensesService.add(data);

  res.statusCode = 201;
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    throw ApiError.NotFound();
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const expense = expensesService.getById(id);

  if (!expense) {
    throw ApiError.NotFound();
  }

  const updatedExpense = expensesService.update(id, data);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
