'use strict';

const expensesService = require('../services/expense.service');
const usersService = require('../services/user.service');
const { messages } = require('../types/messages');
const { statusCode } = require('../types/status.messages');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId && !categories) {
    res.send(expensesService.getByUserId(+req.query.userId));

    return;
  }

  if (from && to) {
    res.send(expensesService.getByDate(from, to));

    return;
  }

  if (categories) {
    res.send(expensesService.getByCategory(+userId, categories));

    return;
  }

  res.send(expensesService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.ok).send(expense);
};

const create = (req, res) => {
  const { title, amount, spentAt, userId } = req.body;

  if (!title || !amount || !spentAt) {
    res.status(statusCode.badRequest).send(messages.expense.requiredFields);

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.status(statusCode.badRequest).send(messages.user.userNotFound);

    return;
  }

  const expense = expensesService.create(req.body);

  res.status(statusCode.created).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const removed = expensesService.remove(+id);

  if (!removed) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.deleted).send(messages.expense.deleted);
};

const update = (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const expense = expensesService.getById(+id);

  if (!expense) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  const updated = expensesService.update(expense, toUpdate);

  if (!updated) {
    res.status(statusCode.notFound).send(messages.expense.notFound);

    return;
  }

  res.status(statusCode.ok).send(updated);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
