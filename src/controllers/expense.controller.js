'use strict';

const expenseService = require('../services/expense.service');
const usersService = require('../services/user.service');

const getAll = (req, res) => {
  const { categories, userId, from, to } = req.query;

  const expenses = expenseService.get({
    categories,
    userId,
    from,
    to,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userIdNumber = parseInt(userId);

  if (isNaN(userIdNumber) || userIdNumber < 0) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title || !spentAt || !amount || !category) {
    res.sendStatus(400);
  }

  const expense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(expense.id, body);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
