'use strict';

const { statusCode } = require('../helpers/statusCode');
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const userExpenses = expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(statusCode.OK);
  res.send(userExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.status(statusCode.OK);
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isExistUser = userService.getById(+userId);

  if (!isExistUser) {
    res.sendStatus(statusCode.BAD_REQUEST);

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

  res.status(statusCode.CREATED);
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expenseToUpdate = expenseService.getById(+id);

  if (!expenseToUpdate) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  const body = req.body;
  const updatedExpense = expenseService.update(body, +id);

  res.status(statusCode.OK);
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  expenseService.remove(+id);
  res.sendStatus(statusCode.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
