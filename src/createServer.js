'use strict';

const express = require('express');
const cors = require('cors');

// let expenses = [
//   {
//     id: 1,
//     userId: 1,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch",
//     amount: 15,
//     category: "Food2",
//     note: "Business lunch"
//   },
//   {
//     id: 2,
//     userId: 1,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch2",
//     amount: 15,
//     category: "Food2",
//     note: "Business lunch2"
//   },
//   {
//     id: 3,
//     userId: 2,
//     spentAt: "2024-01-29T12:00:00.000Z",
//     title: "Lunch3",
//     amount: 15,
//     category: "Electronics",
//     note: "Business lunch3"
//   }
// ];
// let users = [
//   { name: "John Doe" }
// ];

function createServer() {
  let expenses = [];
  let users = [];

  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newUser = users.find((user) => user.id.toString() === id.toString());

    if (!newUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(newUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      name,
      id: users.length + 1,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newUsers = users.filter(
      (user) => user.id.toString() !== id.toString(),
    );

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newUser = users.find((user) => user.id.toString() === id.toString());

    if (!newUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(newUser, { name });

    res.statusCode = 200;
    res.send(newUser);
  });

  // expenses

  app.get('/expenses', (req, res) => {
    if (Object.keys(req.query).length > 0) {
      const query = req.query;

      const filteredExpenses = expenses.filter((expense) => {
        return Object.entries(query).every(([key, value]) => {
          if (key === 'from') {
            return new Date(expense.spentAt) >= new Date(value);
          }

          if (key === 'to') {
            return new Date(expense.spentAt) <= new Date(value);
          }

          if (key === 'categories') {
            const categoriesArray = value.split(',');

            return categoriesArray.includes(expense.category);
          }

          return expense[key]?.toString() === value.toString();
        });
      });

      if (filteredExpenses.length === 0) {
        res.sendStatus(404);

        return;
      }

      res.statusCode = 200;
      res.send(filteredExpenses);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expenses.find(
      (expense) => expense.id.toString() === id.toString(),
    );

    if (!newExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(newExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!userId || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt: spentAt ? new Date(spentAt) : new Date(),
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = expenses.filter(
      (expense) => expense.id.toString() !== id.toString(),
    );

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expenses.find(
      (expense) => expense.id.toString() === id.toString(),
    );

    if (!newExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(newExpense, updateFields);

    res.statusCode = 200;
    res.send(newExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
