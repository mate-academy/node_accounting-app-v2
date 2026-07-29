'use strict';

const express = require('express');

function createServer() {
  const dataBaseUsers = [];
  const dataBaseExpenses = [];
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).json(dataBaseUsers);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: dataBaseUsers.length + 1, name };

    dataBaseUsers.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const userId = req.params.id;
    const userFinded = dataBaseUsers.find(
      (user) => user.id === parseInt(userId),
    );

    if (!userFinded) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(userFinded);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = dataBaseUsers.findIndex(
      (user) => user.id === parseInt(userId),
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    dataBaseUsers.splice(userIndex, 1);
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const userId = req.params.id;
    const { name } = req.body;
    const userFinded = dataBaseUsers.find(
      (user) => user.id === parseInt(userId),
    );

    if (!userFinded) {
      return res.status(404).json({ error: 'Not found' });
    }
    userFinded.name = name;
    res.status(200).json(userFinded);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expenses = [...dataBaseExpenses];

    if (userId) {
      expenses = expenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      expenses = expenses.filter((ex) => categoriesArray.includes(ex.category));
    }

    if (from) {
      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.status(200).json(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!title || amount === undefined || !category) {
      return res.status(400).json({
        error: 'Title, amount and category are required',
      });
    }

    const userFinded = dataBaseUsers.find((user) => user.id === userId);

    if (!userFinded) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    const newExpense = {
      id: dataBaseExpenses.length + 1,
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    };

    dataBaseExpenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    const expenseFinded = dataBaseExpenses.find(
      (expense) => expense.id === expenseId,
    );

    if (!expenseFinded) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    res.status(200).json(expenseFinded);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    const expenseIndex = dataBaseExpenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex === -1) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    dataBaseExpenses.splice(expenseIndex, 1);

    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const { userId, title, amount } = req.body;

    const expenseFinded = dataBaseExpenses.find(
      (expense) => expense.id === expenseId,
    );

    if (!expenseFinded) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    if (userId !== undefined) {
      expenseFinded.userId = Number(userId);
    }

    if (title !== undefined) {
      expenseFinded.title = title;
    }

    if (amount !== undefined) {
      expenseFinded.amount = amount;
    }

    res.status(200).json(expenseFinded);
  });

  return app;
}

module.exports = {
  createServer,
};
