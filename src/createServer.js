'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const userData = [];
  let expenseData = [];
  let expenseId = 1;
  let userId = 1;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('test');
  });

  app.get('/expenses', (req, res) => {
    if (req.query.userId) {
      expenseData = expenseData.filter(
        (e) => e.userId === Number(req.query.userId),
      );
    }

    if (req.query.categories) {
      expenseData = expenseData.filter(
        (e) => e.category === req.query.categories,
      );
    }

    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);

      expenseData = expenseData.filter((e) => {
        const date = new Date(e.spentAt);

        return date >= from && date <= to;
      });
    }

    res.status(200).json(expenseData);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(userData);
  });

  app.get('/users/:id', (req, res) => {
    const user = userData.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    res.status(200).json(user);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenseData.find((f) => {
      return f.id === Number(req.params.id);
    });

    if (!expense) {
      return res.status(404).json({ message: 'Not Found' });
    } else {
      res.status(200).json(expense);
    }
  });

  app.post('/expenses', (req, res) => {
    if (!userData.find((u) => u.id === Number(req.body.userId))) {
      return res.status(400).json({ message: 'Não tem esse usuário' });
    }

    if (
      !req.body.title ||
      !req.body.amount ||
      !req.body.category ||
      !req.body.userId ||
      !req.body.spentAt
    ) {
      return res.status(400).json({ message: 'Falta campos' });
    } else {
      const data = {
        ...req.body,
        id: expenseId,
      };

      expenseData.push(data);
      expenseId += 1;
      res.status(201).json(data);
    }
  });

  app.post('/users', (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Falta campos' });
    } else {
      const data = {
        id: userId,
        name: req.body.name,
        // ...req.body,
      };

      userData.push(data);
      userId += 1;
      res.status(201).json(data);
    }
  });

  /*
  app.put('/expenses', (req, res) => {
    res.status(200).json(expenses);
  });
  */

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenseData.find((e) => {
      return Number(e.id) === Number(req.params.id);
    });

    if (!expense) {
      return res.status(404).json({ message: 'Not Found' });
    }
    // expense.title = req.body.title;
    Object.assign(expense, req.body);
    res.status(200).json(expense);
  });

  /*
  app.put('/users', (req, res) => {
    res.status(200).json(users);
  });
  */

  app.patch('/users/:id', (req, res) => {
    const user = userData.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    Object.assign(user, req.body);

    res.status(200).json(user);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenseData.findIndex(
      (e) => Number(e.id) === Number(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Not Found' });
    } else {
      expenseData.splice(index, 1);
      res.status(204).send();
    }
  });

  app.delete('/users/:id', (req, res) => {
    const index = userData.findIndex(
      (e) => Number(e.id) === Number(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Not Found' });
    } else {
      userData.splice(index, 1);
      res.status(204).send();
    }
  });

  return app;
}

module.exports = {
  createServer,
};
