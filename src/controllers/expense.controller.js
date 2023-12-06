'use strict';

const expenseService = require('./../services/expense.service');

const userService = require('./../services/user.service');

const getAll = (req, res) => {
  return res.send(expenseService.getAll());
};

const filterByPeriod = (req, res) => {
  const { from, to } = req.query;
  const serachByPeriod = expenseService.filterByPeriod(from, to);

  res.statusCode = 200;

  return res.send(serachByPeriod);
};

const filterByCategory = (req, res) => {
  const { categories } = req.query;

  const serachByCategory = expenseService.filterByCategory(categories);

  if (serachByCategory.length === 0) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;

  return res.send(serachByCategory);
};

const filterByUserId = (req, res) => {
  const { userId } = req.query;

  const serachByUserId = expenseService.filterByUserId(userId);

  if (serachByUserId.length === 0) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;

  return res.send(serachByUserId);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title) {
    return res.sendStatus(400);
  }

  const expense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  const user = userService.getById(userId);

  if (!user || expense.length === 0) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;

  return res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expenseService.update(expense, title);

  return res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.remove(id);

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  filterByPeriod,
  filterByCategory,
  filterByUserId,
  getOne,
  create,
  update,
  remove,
};
