'use strict';

const expensesService = require('../services/expenses.service');
const { getOne: getOneUser } = require('../services/user.service');

const get = (req, res) => {
  const userId = parseInt(req.query.userId);
  const { categories, from, to } = req.query;

  const filteredExpenses = expensesService.filter(
    userId,
    categories,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId
    || typeof spentAt !== 'string'
    || !title
    || !amount
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !getOneUser(userId)
  ) {
    return res.sendStatus(400);
  }

  const spentProduct = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(spentProduct);
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const product = expensesService.getOne(id);

  if (typeof id !== 'number' || !id) {
    return res.sendStatus(400);
  }

  if (!product) {
    return res.sendStatus(404);
  }

  res.status(200).send(product);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (!expensesService.getOne(id)) {
    return res.sendStatus(404);
  }

  res.status(204).send(expensesService.remove(id));
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { ...args } = req.body;
  const product = expensesService.getOne(id);

  if (!product) {
    return res.sendStatus(404);
  }

  const updatedProduct = expensesService.update(id, args);

  res.status(200).send(updatedProduct);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
