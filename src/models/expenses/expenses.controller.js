'use strict';

const expensesService = require('./expenses.service');
const userService = require('../user/user.service');

const getAll = (req, res) => {
  const { categories, from, to } = req.query;

  const userId = +req.query.userId;

  res.status(200).send(expensesService.getAll({
    userId,
    from,
    to,
    categories: Array.isArray(categories) ? categories : [categories],
  }));
};

const getById = (req, res) => {
  const id = +req.params.id;

  const item = expensesService.getOne(id);

  if (!item) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(item);
};

const remove = (req, res) => {
  const id = +req.params.id;

  const item = expensesService.getOne(id);

  if (!item) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const create = (req, res) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note = null,
  } = req.body;
  const userId = +req.body.userId;

  const user = userService.getOne(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (
    !spentAt
    || !title
    || !category
    || !amount
  ) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = expensesService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = expensesService.update({
    id, name,
  });

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
