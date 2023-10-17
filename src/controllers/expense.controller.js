'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const query = req.query;

  res.send(expenseService.getAll(query));
};

const getById = (req, res) => {
  const { id } = req.params;
  const searchedExpense = expenseService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(searchedExpense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(id, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
