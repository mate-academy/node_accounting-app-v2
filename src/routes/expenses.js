'use strict';

const express = require('express');
const { findById, findIndexById } = require('../helpers');

function createExpensesRouter(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let result = db.expenses;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to !== undefined) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories !== undefined) {
      result = result.filter((e) => e.category === categories);
    }

    res.send(result);
  });

  router.get('/:id', (req, res) => {
    const expense = findById(db.expenses, req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  });

  router.post('/', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = findById(db.users, userId);

    if (!user || !spentAt || !title || amount === undefined) {
      return res.sendStatus(400);
    }

    const expense = {
      id: db.nextExpenseId++,
      userId: user.id,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    db.expenses.push(expense);
    res.status(201).send(expense);
  });

  router.patch('/:id', (req, res) => {
    const expense = findById(db.expenses, req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.send(expense);
  });

  router.delete('/:id', (req, res) => {
    const index = findIndexById(db.expenses, req.params.id);

    if (index === -1) {
      return res.sendStatus(404);
    }

    db.expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return router;
}

module.exports = { createExpensesRouter };
