'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expenseService.getExpenses(+userId, categories, from, to));
};

const getOne = (req, res) => {
  const id = +req.params.id;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, ...rest } = req.body;

  const user = userService.getById(userId);

  if (!user) {
    res.status(400).send('Bad Request');

    return;
  }

  const newExpense = expenseService.create({
    userId,
    ...rest,
  });

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const id = +req.params.id;

  const user = expenseService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;

  const user = expenseService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  const updatedUser = expenseService.update(id, req.body);

  res.status(200).send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, update,
};
