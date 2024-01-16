'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    const parsedId = parseInt(userId, 10);

    if (userId && isNaN(parsedId)) {
      res.sendStatus(400);

      return;
    }

    res.send(expenseService.getByQueries({
      userId: parsedId,
      categories,
      from,
      to,
    }));

    return;
  }

  res.send(expenseService.getAll());
};

const getOne = (req, res) => {
  const { parsedId } = req;

  const expense = expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = userService.getById(userId);
  const isDateValid = !isNaN(Date.parse(spentAt));

  if (!user
    || !isDateValid
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string') {
    res.sendStatus(400);

    return;
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

const remove = (req, res) => {
  const { parsedId } = req;

  const expense = expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(parsedId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { parsedId } = req;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if ((title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
    || (note && typeof note !== 'string')) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.update({
    parsedId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  remove,
  update,
  create,
};
