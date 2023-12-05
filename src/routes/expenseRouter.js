'use strict';

const express = require('express');
const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

const expenseRouter = express.Router();

expenseRouter.get('/', (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    const filterData = expenseService.getFiltered(userId, categories, from, to);

    if (filterData.length) {
      res.send(filterData);

      return;
    } else {
      res.sendStatus(404);

      return;
    }
  }

  res.statusCode = 200;
  res.send(expenseService.getAll());
});

expenseRouter.post('/', (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(userId)
    || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
});

expenseRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
});

expenseRouter.patch('/:id', (req, res) => {
  const { id } = req.params;

  const data = Object.fromEntries(Object.entries(req.body));

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(id, data);

  res.send(updatedExpense);
});

expenseRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(Number(id))) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(Number(id));
  res.sendStatus(204);
});

module.exports = expenseRouter;
