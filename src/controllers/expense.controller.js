'use strict';

const expenseService = require('../services/expense.service.js');

const get = (req, res) => {
  Object.entries(req.body).length === 0
    ? res.send(expenseService.getAll())
    : res.send(expenseService.getSome(req.body));
};

const create = (req, res) => {
  const newExpense = expenseService.create(req.body);

  res.status(201).send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(id);

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedExpense = expenseService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
