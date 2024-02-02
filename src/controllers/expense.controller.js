'use strict';

const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const get = async(req, res) => {
  res.send(expenseService.get(req));
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(+userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create(req.body);

  res.status(201);
  res.send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const expense = expenseService.update(id, req.body);

  res.send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
