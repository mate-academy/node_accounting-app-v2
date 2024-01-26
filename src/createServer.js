'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let users = [];
let expenses = [];

const clear = () => {
  users = [];
  expenses = [];
};

function createServer() {
  clear();
  app.use(bodyParser.json());

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Bad request - Name is required' });
    }

    const existingUser = users.find((user) => user.name === name);

    if (existingUser) {
      return res.status(201).json(existingUser);
    }

    const newUser = {
      id: users.length,
      name: name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId < 0 || userId >= users.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    const user = users[userId];

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId < 0 || userId >= users.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    users.splice(userId, 1);

    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId < 0 || userId >= users.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Bad request - Name is required' });
    }

    users[userId].name = name;

    res.status(200).json(users[userId]);
  });

  app.get('/expenses', (req, res) => {
    const objectUrl = new URL(req.url, 'http://localhost:3000');
    const userId = parseInt(objectUrl.searchParams.get('userId'));
    const categories = objectUrl.searchParams.getAll('categories');
    const from = objectUrl.searchParams.get('from');
    const to = objectUrl.searchParams.get('to');

    let filteredExpenses = expenses;

    if (userId !== undefined && !isNaN(userId)) {
      filteredExpenses = filteredExpenses
        .filter((expense) => expense.userId === userId);
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from)
          && new Date(expense.spentAt) <= new Date(to)
      );
    }

    if (userId === 0 && categories.length > 0) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        return expense.userId === 0 && categories.includes(expense.category);
      });
    }

    res.status(200).json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId === undefined || !spentAt || !title || !amount || !category) {
      return (res.status(400)
        .json({ error: 'Bad request - Required fields are missing' }));
    }

    const userExists = users.some((user) => user.id === userId
      || (user.id === 0 && userId === 0));

    if (!userExists) {
      return res.status(400).json({ error: 'Bad request - User not found' });
    }

    const existingExpense = expenses.find(
      (expense) => expense.title === title && expense.spentAt === spentAt
    );

    if (existingExpense) {
      return (res.status(400)
        .json({ error: 'Bad request - Expense with the same '
        + 'title and spentAt already exists' }));
    }

    const newExpense = {
      id: expenses.length,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note || '',
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);

    if (isNaN(expenseId) || expenseId < 0 || expenseId >= expenses.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    const userExpenses = expenses.filter(exp => exp.userId === expenseId);

    res.status(200).json(userExpenses[0]);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);

    if (isNaN(expenseId) || expenseId < 0 || expenseId >= expenses.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    expenses.splice(expenseId, 1);

    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);

    if (isNaN(expenseId) || expenseId < 0 || expenseId >= expenses.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (!spentAt && !title && !amount && !category && !note) {
      return res.status(400).json({ error: 'Bad request - '
      + 'At least one field is required for update' });
    }

    const updatedExpense = {
      ...expenses[expenseId],
      spentAt: spentAt || expenses[expenseId].spentAt,
      title: title || expenses[expenseId].title,
      amount: amount || expenses[expenseId].amount,
      category: category || expenses[expenseId].category,
      note: note || expenses[expenseId].note,
    };

    expenses[expenseId] = updatedExpense;

    res.status(200).json(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
