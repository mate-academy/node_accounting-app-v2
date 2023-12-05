'use strict';

const expenseService = require('./../services/expenses.service');
const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { isDate } = require('../helpers/isDate');

const get = (req, res) => {
  res.send(expenseService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = expenseService.getById(id);

  if (!user) {
    notFoundResponse(res);
  }

  res.send(user);
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

  if (!userService.getById(userId)) {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid userId',
      });
  }

  if (!isDate(spentAt)) {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid date',
      });
  }

  if (!category || typeof category !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `category` as a string.',
      });
  }

  if (!note || typeof note !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `note` as a string.',
      });
  }

  if (!amount || typeof amount !== 'number') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `amount` as a number.',
      });
  }

  if (!title || typeof title !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `name` as a string.',
      });
  }

  const newUser = expenseService.create(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }
  );

  res.status(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    notFoundResponse(res);
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = expenseService.getById(id);

  if (!name || typeof name !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `name` as a string.',
      });
  }

  if (!user) {
    notFoundResponse(res);
  }

  expenseService.update(id, name);

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
