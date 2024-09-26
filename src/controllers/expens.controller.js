'use strict';

const expensService = require('../services/expense.servisce');

const get = (req, res) => {
  res.send(expensService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expens = expensService.getById(id);

  if (!expens) {
    res.sendStatus(404);

    return;
  }
  res.send(expens);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const newUser = expensService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;
  const expens = expensService.getById(id);

  if (!expens) {
    res.sendStatus(404);

    return;
  }

  if (
    typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || typeof userId !== 'string'
    || typeof amount !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newexpens = expensService.update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(newexpens);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
