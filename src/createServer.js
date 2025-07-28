'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');

function createServer() {
  const app = express();

  app.use(express.json());

  const expenses = [];
  const categories = [];

  app.post('/expenses', (req, res) => {
    const { title, amount, categoryId } = req.body;

    if (!title || !amount || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const expense = {
      id: uuidv4(),
      title,
      amount,
      categoryId,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    res.json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  });

  app.put('/expense/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, amount, categoryId } = req.body;

    if (!title || !amount || !categoryId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    expenses[index] = {
      id: expenses[index].id,
      title,
      amount,
      categoryId,
    };
    res.json(expenses[index]);
  });

  app.delete('/expense/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expenses.splice(index, 1);
    res.status(204).end();
  });

  app.post('/categories', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing category name' });
    }

    const category = {
      id: uuidv4(),
      name,
    };

    categories.push(category);
    res.status(201).json(category);
  });

  app.get('/categories', (req, res) => {
    res.json(categories);
  });

  app.get('/caterories/:id', (req, res) => {
    const category = categories.find((c) => c.id === req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  });

  app.put('/categories/:id', (req, res) => {
    const index = categories.findIndex((c) => c.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(404).json({ message: 'Missing category name' });
    }

    categories[index].name = name;
    res.json(categories[index]);
  });

  app.delete('/categories/:id', (req, res) => {
    const index = categories.findIndex((c) => c.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Category not found' });
    }

    categories.splice(index, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
