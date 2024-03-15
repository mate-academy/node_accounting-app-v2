'use strict';

const expensesService = require('../services/expense.service');
const usersService = require('../services/user.service');

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
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { title, amount, spentAt, userId } = req.body;

  if (!title || !amount || !spentAt) {
    res.status(400).send('Missing required fields');

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.status(400).send('User not found');

    return;
  }

  const expense = expensesService.create(req.body);

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const removed = expensesService.remove(+id);

  if (!removed) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(204).send('Expense deleted');
};

const update = (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;
  const expense = expensesService.getById(+id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  const updated = expensesService.update(expense, toUpdate);

  if (!updated) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(updated);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
