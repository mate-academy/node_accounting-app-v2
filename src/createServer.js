'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];

  const expenses = [];

  // USERS
  app.get('/users', (request, response) => {
    response.send(users);
  });

  app.post('/users', (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.sendStatus(400);

      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
    };

    response.statusCode = 201;
    users.push(newUser);
    response.send(newUser);
  });

  app.get('/users/:id', (request, response) => {
    const { id } = request.params;
    const wantedUser = users.find((user) => user.id === Number(id));

    if (!wantedUser) {
      response.sendStatus(404);

      return;
    }

    response.send(wantedUser);
  });

  app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    const indexToDelete = users.findIndex((user) => user.id === Number(id));

    if (indexToDelete === -1) {
      response.sendStatus(404);

      return;
    }

    users.splice(indexToDelete, 1);
    response.sendStatus(204);
  });

  app.patch('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const userToUpdate = users.find((user) => user.id === Number(id));

    if (!userToUpdate) {
      response.sendStatus(404);

      return;
    }

    if (!name) {
      response.sendStatus(422);

      return;
    }

    Object.assign(userToUpdate, { name: name });
    response.send(userToUpdate);
  });

  // EXPENSES
  app.get('/expenses', (request, response) => {
    let filteredExpenses = expenses;

    if (request.query.userId) {
      const userId = Number(request.query.userId);

      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === userId
      );
    }

    if (request.query.categories) {
      const categories = request.query.categories.split(',');

      filteredExpenses = filteredExpenses.filter((expense) =>
        categories.includes(expense.category)
      );
    }

    if (request.query.from || request.query.to) {
      const fromDate = request.query.from
        ? new Date(request.query.from)
        : new Date(0);
      const toDate = request.query.to ? new Date(request.query.to) : new Date();

      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    response.json(filteredExpenses);
  });

  app.post('/expenses', (request, response) => {
    const { userId, spentAt, title, amount, category, note } = request.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      response.sendStatus(400);

      return;
    }

    if (!users.find((user) => user.id === userId)) {
      response.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    response.statusCode = 201;
    expenses.push(newExpense);
    response.send(newExpense);
  });

  app.get('/expenses/:id', (request, response) => {
    const { id } = request.params;
    const wantedExpense = expenses.find((expense) => expense.id === Number(id));

    if (!wantedExpense) {
      response.sendStatus(404);

      return;
    }

    response.send(wantedExpense);
  });

  app.delete('/expenses/:id', (request, response) => {
    const { id } = request.params;
    const indexToDelete = expenses.findIndex(
      (expense) => expense.id === Number(id)
    );

    if (indexToDelete === -1) {
      response.sendStatus(404);

      return;
    }

    expenses.splice(indexToDelete, 1);
    response.sendStatus(204);
  });

  app.patch('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    const userToUpdate = users.find((user) => user.id === Number(id));

    if (!userToUpdate) {
      response.sendStatus(404);

      return;
    }

    if (!name) {
      response.sendStatus(422);

      return;
    }

    Object.assign(userToUpdate, { name: name });
    response.send(userToUpdate);
  });

  app.patch('/expenses/:id', (request, response) => {
    const { id } = request.params;
    const { spentAt, title, amount, category, note } = request.body;
    const expenseToUpdate = expenses.find(
      (expense) => expense.id === Number(id)
    );

    if (!expenseToUpdate) {
      response.sendStatus(404);

      return;
    }

    if (spentAt || title || amount || category || note) {
      if (title) {
        expenseToUpdate.title = title;
      }

      if (amount) {
        expenseToUpdate.amount = amount;
      }

      if (category) {
        expenseToUpdate.category = category;
      }

      if (note !== undefined) {
        expenseToUpdate.note = note;
      }
      response.send(expenseToUpdate);
    } else {
      response.sendStatus(400);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
