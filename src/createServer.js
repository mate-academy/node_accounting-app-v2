'use strict';

const express = require('express');

function createServer() {
  const userList = [];
  const expenseList = [];
  const server = express();

  server.use(express.json());

  server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const findUser = userList.find((user) => user.id === Number(id));

    if (!findUser) {
      res.status(404).send('User with this id does not exist');

      return;
    }

    res.status(200).json(findUser);
  });

  server.get('/users', (req, res) => {
    res.send(userList);
  });

  server.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('username is empty');

      return;
    }

    const user = {
      id: userList.length + 1,
      name,
    };

    userList.push(user);

    res.status(201).json(user);
  });

  server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userToRemove = userList.findIndex((user) => user.id === Number(id));

    if (userToRemove === -1) {
      res.status(404).send('This id does not exist');

      return;
    }

    userList.splice(userToRemove, 1);

    res.status(204).send();
  });

  server.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (userList.length === 0) {
      res.status(404).send('Userlist is empty');

      return;
    }

    if (typeof name === 'string') {
      const userToUpdate = userList.find((user) => user.id === Number(id));

      if (!userToUpdate) {
        res.status(404).send('This id does not exist');

        return;
      }

      userToUpdate.name = name;

      res.json(userToUpdate).status(200);

      return;
    }

    res.status(200).json('Wrong type of name');
  });

  server.get('/expenses', express.json(), (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = expenseList;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (expenseList.length === 0) {
      res.status(200);
    }

    if (from || to) {
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      filteredExpenses = filteredExpenses.filter((expanse) => {
        const spentAt = new Date(expanse.spentAt);

        if (isNaN(spentAt)) {
          return false;
        }

        const isAfterFromDate = fromDate ? spentAt >= fromDate : true;

        const isBeforeToDate = toDate ? spentAt <= toDate : true;

        return isAfterFromDate && isBeforeToDate;
      });
    }

    if (categories) {
      const categoryList = categories.toLowerCase().split(',');

      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.category &&
          categoryList.includes(expense.category.toLowerCase()),
      );
    }
    res.json(filteredExpenses);
  });

  server.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, note, category } = req.body;

    const findUser = userList.find((user) => user.id === Number(userId));

    if (!findUser) {
      res.status(400).send();
    }

    const expenseData = {
      userId,
      spentAt,
      title,
      amount,
      note,
      category,
      id: expenseList.length + 1,
    };

    expenseList.push(expenseData);
    res.status(201).json(expenseData);
  });

  server.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const findExpense = expenseList.find(
      (expense) => expense.id === Number(id),
    );

    if (!findExpense) {
      res.status(404).send('Expense not found');
    }

    res.status(200).json(findExpense);
  });

  server.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const foundExpense = expenseList.find(
      (expense) => expense.id === Number(id),
    );

    if (!foundExpense) {
      res.status(404);
    }

    foundExpense.title = title;

    res.status(200).send(foundExpense);
  });

  server.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expensesIndex = expenseList.findIndex(
      (expense) => expense.id === Number(id),
    );

    if (expensesIndex === -1) {
      return res.status(404).send('Expense not found');
    }

    expenseList.splice(expensesIndex, 1);

    res.status(204).send();
  });

  return server;
  // Return the server (express app)
}

module.exports = {
  createServer,
};
