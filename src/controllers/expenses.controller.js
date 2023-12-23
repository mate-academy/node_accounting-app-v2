'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const allExpenses = expensesService.getAllExpenses();

  if (!allExpenses) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  let filteredExpenses = {};

  if (categories && userId) {
    filteredExpenses = allExpenses.filter(item => item.category === categories);

    return res.send(filteredExpenses);
  };

  if (userId) {
    filteredExpenses = allExpenses.filter(
      item => item.userId === Number(userId));

    return res.send(filteredExpenses);
  }

  if (!allExpenses.length) {
    return res.send([]);
  }

  if (from && to) {
    filteredExpenses = allExpenses.filter(
      item => item.spentAt > from && item.spentAt < to);

    return res.send(filteredExpenses);
  }

  return res.send(allExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const item = expensesService.getExpensesById(id);

  if (!item) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  res.send(item);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userService.getUsersById(Number(userId)) || !title) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  };

  const item = expensesService.createExpenses(userId,
    spentAt,
    title,
    amount,
    category,
    note);

  if (!item) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  res.status(201).json(item);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const item = expensesService.getExpensesById(Number(id));

  if (!item) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  if (typeof title !== 'string') {
    return res.sendStatus(422);
  }

  const updatedExpenses = expensesService.updateExpenses(title, item);

  res.send(updatedExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  const item = expensesService.getExpensesById(Number(id));

  if (!item) {
    res.status(404).send('Not Found: The specified entity does not exist');

    return;
  }

  expensesService.removeExpenses(Number(id));

  return res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
