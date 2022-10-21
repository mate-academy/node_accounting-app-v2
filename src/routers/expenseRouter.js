'use strict';

const express = require('express');

const router = express.Router();

const expenseServise = require('../services/expenses.js');
const userServise = require('../services/users.js');

router.post('/', (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  if (!title || !userServise.exist(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    ...req.body,
    id: Math.floor(Math.random() * 10),
  };

  expenseServise.add(newExpense);

  res.statusCode = 201;

  res.send(newExpense);
});

router.get('/', (req, res) => {
  const expenses = expenseServise.getAll();

  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const id = Number(userId);

  if (typeof id !== 'number') {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 200;

  if (!expenses.length) {
    res.send([]);

    return;
  }

  if (from && to) {
    const userExpenses = expenseServise.filter(
      expense => expense.spentAt > from && expense.spentAt < to
    );

    res.send(userExpenses);

    return;
  }

  if (userServise.findById(id)) {
    let userExpenses = expenseServise.filter(
      expense => expense.userId === id
    );

    if (category) {
      userExpenses = userExpenses.filter(
        expense => expense.category === category
      );
    }

    res.send(userExpenses);

    return;
  }

  res.send(expenseServise.getAll());
});

router.get('/:id', (req, res) => {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
});

router.patch('/:id', (req, res) => {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.update(foundExpense, req.body);

  res.statusCode = 200;

  res.send(foundExpense);
});

router.delete('/:id', (req, res) => {
  const expenseId = Number(req.params.id);

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.remove(expenseId);
  res.sendStatus(204);
});

module.exports = router;
