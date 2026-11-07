'use strict';

const express = require('express');

function createExpensesRouter(data) {
  const router = express.Router();

  router.get('/', (req, res) => {
    let result = data.expenses;
    const { userId, categories, from, to } = req.query;

    if (userId) {
      result = result.filter((exp) => exp.userId === Number(userId));
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((exp) => categoryList.includes(exp.category));
    }

    if (from) {
      result = result.filter((exp) => new Date(exp.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((exp) => new Date(exp.spentAt) <= new Date(to));
    }

    res.send(result);
  });

  router.post('/', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400).send('Bad request');

      return;
    }

    const user = data.users.find((usr) => usr.id === userId);

    if (!user) {
      res.status(400).send('No such user');

      return;
    }

    const newExpenses = {
      id: data.countExpenses,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    data.countExpenses++;
    data.expenses.push(newExpenses);
    res.status(201).send(newExpenses);
  });

  router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const expense = data.expenses.find((exp) => exp.id === id);

    if (!expense) {
      res.status(404).send('Not found');

      return;
    }

    res.send(expense);
  });

  router.patch('/:id', express.json(), (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const expense = data.expenses.find((exp) => exp.id === id);

    if (!expense) {
      res.status(404).send('Not found');

      return;
    }

    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];

    allowedFields.forEach((filed) => {
      if (req.body[filed] !== undefined) {
        expense[filed] = req.body[filed];
      }
    });

    res.send(expense);
  });

  router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send('Bad request');

      return;
    }

    const expense = data.expenses.find((exp) => exp.id === id);

    if (!expense) {
      res.status(404).send('Not found');

      return;
    }

    data.expenses = data.expenses.filter((exp) => exp.id !== id);

    res.sendStatus(204);
  });

  return router;
}

module.exports = {
  createExpensesRouter,
};
