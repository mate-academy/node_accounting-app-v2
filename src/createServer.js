'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const app = express();

  app.use(express.json());

  app.post('/users', (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });

      return;
    }

    const id = nextUserId++;
    const user = { id, name };

    users.push(user);
    response.status(201).json(user);
  });

  app.get('/users', (request, response) => {
    response.status(200).json(users || []);
  });

  app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const oneUser = users.find((user) => user.id === id);

    if (!oneUser) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    response.status(200).json(oneUser);
  });

  app.patch('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const userToUpdate = users.find((user) => user.id === id);

    if (!userToUpdate) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    delete request.body.id;
    Object.assign(userToUpdate, request.body);
    response.status(200).json(userToUpdate);
  });

  app.delete('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!users.find((user) => user.id === id)) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    users = users.filter((user) => user.id !== id);
    response.status(204).send();
  });

  app.post('/expenses', (request, response) => {
    const { userId, spentAt, title, amount, category, note } = request.body;

    if (
      !userId ||
      !spentAt ||
      !title ||
      !category ||
      !note ||
      amount === undefined
    ) {
      response.status(400).json({ error: 'All fields are required' });

      return;
    } else if (!users.find((user) => user.id === userId)) {
      response.status(400).json({ error: 'User not found' });

      return;
    }

    const id = nextExpenseId++;
    const expense = { ...request.body, id };

    expenses.push(expense);
    response.status(201).json(expense);
  });

  app.get('/expenses', (request, response) => {
    const { userId, from, to, categories } = request.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categoriesArray.includes(expense.category);
      });
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    response.status(200).json(filteredExpenses || []);
  });

  app.get('/expenses/:id', (request, response) => {
    const id = Number(request.params.id);
    const oneExpense = expenses.find((expense) => expense.id === id);

    if (!oneExpense) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    response.status(200).json(oneExpense);
  });

  app.patch('/expenses/:id', (request, response) => {
    const id = Number(request.params.id);
    const expenseToUpdate = expenses.find((expense) => expense.id === id);

    if (!expenseToUpdate) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    if (request.body.userId !== undefined) {
      response.status(400).json({ error: 'UserId cannot be updated' });

      return;
    }

    delete request.body.id;
    Object.assign(expenseToUpdate, request.body);
    response.status(200).json(expenseToUpdate);
  });

  app.delete('/expenses/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!expenses.find((expense) => expense.id === id)) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    expenses = expenses.filter((expense) => expense.id !== id);
    response.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
