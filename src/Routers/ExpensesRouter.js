'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { myStore } = require('../Data/Store');

const expensesRouter = express.Router();

expensesRouter.use(bodyParser.json());

expensesRouter.post('/', (req, res) => {
  const { title, userId } = req.body;

  if (!title || !myStore.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(myStore.postExpenses(req.body));
});

expensesRouter.get('/', (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.status(200).send(myStore.getAllExpenses(userId, categories, from, to));
});

expensesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (myStore.getExpenses(id) === undefined) {
    res.sendStatus(404);

    return;
  } else if (!id) {
    res.sendStatus(400);

    return;
  }

  res.status(200).send(myStore.getExpenses(id));
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (myStore.getExpenses(id) === undefined) {
    res.sendStatus(404);

    return;
  }

  res.status(204).send(myStore.deleteExpenses(id));
});

expensesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!myStore.getExpenses(id)) {
    res.sendStatus(404);

    return;
  }

  res.status(200)
    .send(myStore.patchExpenses(id, spentAt, title, amount, category, note));
});

module.exports = {
  expensesRouter,
};
