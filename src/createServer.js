const express = require('express');

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const user = req.body;

    if (user.name === '' || !user.name) {
      res.status(400).json({ error: 'Name is required' });

      return;
    }

    const newUser = {
      id: Date.now(),
      name: user.name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const userUrl = req.params.id;
    const foundUser = users.find((u) => u.id === Number(userUrl));

    if (!foundUser) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }
    res.status(200).json(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userUrl = req.params.id;
    const indexUser = users.findIndex((u) => u.id === Number(userUrl));

    if (indexUser === -1) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }
    users.splice(indexUser, 1);
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const userUrl = req.params.id;
    const indexUser = users.findIndex((u) => u.id === Number(userUrl));
    const newUpdateUser = req.body;

    if (indexUser === -1) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }

    const updateUser = { ...users[indexUser], ...newUpdateUser };

    users.splice(indexUser, 1, updateUser);
    res.status(200).json(updateUser);
  });

  // rotas expenses
  app.get('/expenses', (req, res) => {
    let expensesList = expenses;
    const expenseParams = req.query;

    if (expenseParams.categories) {
      expensesList = expensesList.filter((e) => {
        return expenseParams.categories.includes(e.category);
      });
    }

    if (expenseParams.userId) {
      expensesList = expensesList.filter(
        (e) => e.userId === Number(expenseParams.userId),
      );
    }

    if (expenseParams.from) {
      expensesList = expensesList.filter(
        (e) => new Date(e.spentAt) >= new Date(expenseParams.from),
      );
    }

    if (expenseParams.to) {
      expensesList = expensesList.filter(
        (e) => new Date(e.spentAt) <= new Date(expenseParams.to),
      );
    }

    res.status(200).json(expensesList);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title || !amount || !category || !userId || !spentAt) {
      res.status(400).json({ error: 'error 404, dada is form not null' });

      return;
    }

    const verificationUser = users.find((u) => u.id === userId);

    if (!verificationUser) {
      res.status(400).json({ error: 'user is not acess' });

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

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = req.params.id;
    const foundExpense = expenses.find((e) => e.id === Number(expenseId));

    if (!foundExpense) {
      res.status(404).json({ error: 'expense is does exist' });

      return;
    }

    res.status(200).json(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = req.params.id;
    const indexExpense = expenses.findIndex((e) => e.id === Number(expenseId));

    if (indexExpense === -1) {
      res.status(404).json({ error: 'error expense is does not exist' });

      return;
    }

    expenses.splice(indexExpense, 1);
    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = req.params.id;
    const indexExpense = expenses.findIndex((e) => e.id === Number(expenseId));
    const attExpense = req.body;

    if (indexExpense === -1) {
      res.status(404).json({ error: 'error expense is does not exist' });

      return;
    }

    const updadteExpense = { ...expenses[indexExpense], ...attExpense };

    expenses.splice(indexExpense, 1, updadteExpense);
    res.status(200).json(updadteExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
