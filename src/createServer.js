/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];
  let expenses = [];
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).send({ message: 'ID should be numeric' });

      return;
    }

    const searchedUser = users.find((user) => user.id === +id);

    if (!searchedUser) {
      res.status(404).send({ message: 'No such user' });
    } else {
      res.status(200).send(searchedUser);
    }
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: 'name is required' });

      return;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 0,
      name,
    };

    users.push(newUser);

    res.status(201).send(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(+id)) {
      res.status(400).send({ message: 'ID should be numeric' });

      return;
    } else if (!name) {
      res.status(400).send({ message: 'name is required to upadate user' });

      return;
    }

    const userToUpdate = users.find((user) => user.id === +id);

    if (!userToUpdate) {
      res.status(404).send({ message: 'No such user' });

      return;
    }

    userToUpdate.name = name;

    res.status(200).send(userToUpdate);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userToDelete = users.find((user) => user.id === +id);

    if (!userToDelete) {
      res.status(404).send({ message: 'No such user' });

      return;
    }

    const newUsers = users.filter((user) => user.id !== +id);

    users = newUsers;

    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let expensesToReturn = [...expenses];

    if (userId) {
      expensesToReturn = [...expensesToReturn].filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      expensesToReturn = [...expensesToReturn].filter((expense) =>
        // eslint-disable-next-line prettier/prettier
        categories.includes(expense.category),);
    }

    if (from) {
      expensesToReturn = [...expensesToReturn].filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      expensesToReturn = [...expensesToReturn].filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.status(200).send(expensesToReturn);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).send({ message: 'ID should be numeric' });

      return;
    }

    const expenseToFind = expenses.find((expense) => expense.id === +id);

    if (!expenseToFind) {
      res.status(404).send({ message: 'No such expense' });

      return;
    }

    res.status(200).send(expenseToFind);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.find((u) => u.id === +userId)) {
      res.status(400).send({ message: 'No such user' });

      return;
    }

    const newExpense = {
      id:
        expenses.length > 0
          ? Math.max(...expenses.map((expense) => expense.id)) + 1
          : 0,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400).send({ message: 'ID should be numeric' });

      return;
    }

    if (!expenses.find((expense) => expense.id === +id)) {
      res.status(404).send({ message: 'No such expense' });

      return;
    }

    const newExpenses = expenses.filter((expense) => expense.id !== +id);

    expenses = newExpenses;

    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (isNaN(+id)) {
      res.status(400).send({ message: 'ID should be numeric' });

      return;
    }

    const expenseToUpdate = expenses.find((expense) => expense.id === +id);

    if (!expenseToUpdate) {
      res.status(404).send({ message: 'No such expense' });

      return;
    }

    if (!userId && !spentAt && !title && !amount && !category && !note) {
      res.status(400).send({ message: 'At least one field is required' });

      return;
    }

    if (userId && !users.find((u) => u.id === +userId)) {
      res.status(400).send({ message: 'No such user' });

      return;
    }

    if (userId) {
      expenseToUpdate.userId = userId;
    }

    if (spentAt) {
      expenseToUpdate.spentAt = spentAt;
    }

    if (title) {
      expenseToUpdate.title = title;
    }

    if (amount) {
      expenseToUpdate.amount = amount;
    }

    if (category) {
      expenseToUpdate.category = category;
    }

    if (note) {
      expenseToUpdate.note = note;
    }

    res.status(200).send(expenseToUpdate);
  });

  return app;
}

module.exports = {
  createServer,
};
