/* eslint-disable no-constant-condition */
const express = require('express');
const userController = require('./users.controller.js');
const expensesController = require('./expenses.controller.js');

const router = express.Router();

const keys = ['spentAt', 'title', 'amount', 'category', 'note'];

router.get('/', (req, res) => {
  if (req.query) {
    const userId = req.query['userId'] || null;
    const category = req.query['category']?.trim() || null;
    const from = req.query['from'] || null;
    const to = req.query['to'] || null;

    const expenses = expensesController.getByParams(userId, category, from, to);

    res.statusCode = 200;
    res.send(expenses);

    return;
  }

  res.statusCode = 200;
  res.send(expensesController.getAll());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const target = expensesController.getById(+id);

  if (!target) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.send(target);
});

router.post('/', express.json(), (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string'
  ) {
    res.statusCode = 400;

    res.end();

    return;
  }

  if (!userController.getById(userId)) {
    res.statusCode = 404;
    res.end();

    return;
  }

  const expense = expensesController.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(expense);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteStatus = expensesController.deleteExpense(+id);

  if (!deleteStatus) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 204;
  res.end();
});

router.patch('/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const toUpdate = req.body;

  for (const key of Object.keys(toUpdate)) {
    if (!keys.includes(key)) {
      res.statusCode = 400;
      res.end();

      return;
    }
  }

  const expense = expensesController.update(+id, toUpdate);

  if (!expense) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 200;
  res.send(expense);
});

module.exports = {
  router,
};
