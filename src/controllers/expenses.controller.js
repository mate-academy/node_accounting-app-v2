'use strict';

const expenseService = require('./../services/expenses.service');
const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { isDate } = require('../helpers/isDate');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  return res.send(expenseService.getExpenses(userId, from, to, categories));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = expenseService.getById(id);

  if (!user) {
    return notFoundResponse(res);
  }

  return res.send(user);
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
        error: 'User not found',
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

  if (amount === undefined || typeof amount !== 'number') {
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
        error: 'Please provide a valid `title` as a string.',
      });
  }

  const newExpense = expenseService.create(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }
  );

  return res.status(201).json(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res
      .status(404)
      .json({
        error: 'Expense not found',
      });
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    return res
      .status(404)
      .json({
        error: 'Expense not found',
      });
  }

  if (
    dataToUpdate.hasOwnProperty('id')
    || dataToUpdate.hasOwnProperty('userId')
  ) {
    return res
      .status(400)
      .json({
        error: 'You can not update id or userId',
      });
  }

  if (dataToUpdate.spentAt && !isDate(dataToUpdate.spentAt)) {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid date',
      });
  }

  if (dataToUpdate.category && typeof dataToUpdate.category !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `category` as a string.',
      });
  }

  if (dataToUpdate.note && typeof dataToUpdate.note !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `note` as a string.',
      });
  }

  if (dataToUpdate.amount && typeof dataToUpdate.amount !== 'number') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `amount` as a number.',
      });
  }

  if (dataToUpdate.title && typeof dataToUpdate.title !== 'string') {
    return res
      .status(400)
      .json({
        error: 'Please provide a valid `title` as a string.',
      });
  }

  expenseService.update(id, dataToUpdate);

  res.send(expense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
