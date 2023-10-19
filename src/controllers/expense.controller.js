'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');
const httpStatusCodes = require('../utils/httpStatusCodes');

const getAll = (req, res) => {
  const query = req.query;

  res.send(expenseService.getAll(query));
};

const getById = (req, res) => {
  const { id } = req.params;
  const searchedExpense = expenseService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

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
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

    return;
  }

  if (!userService.getById(userId)) {
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

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

  res.statusCode = httpStatusCodes.CREATED;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  const updatedExpense = expenseService.update(id, body);

  res.statusCode = httpStatusCodes.OK;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
