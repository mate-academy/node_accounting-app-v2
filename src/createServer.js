'use strict';

const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;

function createServer() {
  const collections = {
    users: [],
    expenses: [],
  };

  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(collections.users);
  });

  app.get('users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = collections.users.find(user => user.id === userId);

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200);
    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || Object.keys(req.body).length > 1) {
      res.sendStatus(422);

      return;
    }

    const newUser = {
      id: uuid(),
      name: name,
    };

    collections.users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = collections.users.find(user => user.id === userId);
    const filteredUsers = collections.users.filter(user => user.id !== userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    collections.users = filteredUsers;
    res.statusCode = 204;
    res.send(foundUser);
  });

  app.patch('users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = collections.users.find(user => user.id === userId);

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.get('/expenses', (res, req) => {
    res.send(collections.expenses);
  });

  app.get('/expenses/:purchaseId', (res, req) => {
    const { purchaseId } = req.params;
    const foundPurchase = collections.expenses
      .find(purchase => purchase.id === purchaseId);

    if (!purchaseId) {
      res.sendStatus(400);

      return;
    }

    if (!foundPurchase) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200);
    res.send(foundPurchase);
  });

  app.post('expenses/:purchaseId', express.json(), (res, req) => {
    const { purchaseId } = req.params;
    const requestBody = req.body;
    const requestKeys = Object.keys(requestBody);
    const requiredKeys = {
      userId: 'number',
      spentAt: 'string',
      title: 'string',
      amount: 'number',
      category: 'string',
      note: 'string',
    };

    if (requestKeys.length < 6) {
      res.sendStatus(400);

      return;
    }

    requestKeys.forEach(key => {
      if (!requiredKeys[key]) {
        res.sendStatus(400);

        return;
      }

      if (key === 'spentAt' && !(requestBody[key] instanceof Date)) {
        res.sendStatus(400);

        return;
      }

      if ((key === 'userId' || key === 'amount')
      && typeof requestBody[key] !== 'number') {
        res.sendStatus(400);

        return;
      }

      if (typeof requestBody[key] !== 'string') {
        res.sendStatus(400);
      }
    });

    if (!purchaseId) {
      res.sendStatus(400);

      return;
    }

    const newPurchase = {
      id: uuid(),
      ...requestBody,
    };

    res.statusCode = 201;
    collections.expenses.push(newPurchase);
    res.send(newPurchase);
  });

  app.delete('/expenses/:purchaseId', (req, res) => {
    const { purchaseId } = req.params;
    const foundPurchase = collections.expenses
      .find(purchase => purchase.id === purchaseId);

    const filteredExpenses = collections.expenses
      .filter(purchase => purchase.id !== purchaseId);

    if (!purchaseId) {
      res.sendStatus(400);

      return;
    }

    if (!foundPurchase) {
      res.sendStatus(404);
    }

    collections.expenses = filteredExpenses;
    res.statusCode = 204;
    res.send(foundPurchase);
  });

  app.patch('/expenses/:purchaseId', express.json(), (res, req) => {
    const { purchaseId } = req.params;
    const foundPurchase = collections.expenses
      .find(purchase => purchase.id === purchaseId);

    if (!purchaseId) {
      res.sendStatus(400);

      return;
    }

    if (!foundPurchase) {
      res.sendStatus(404);

      return;
    }

    const requestBody = req.body;
    const requestKeys = Object.keys(requestBody);
    const requiredKeys = {
      spentAt: 'string',
      title: 'string',
      amount: 'number',
      category: 'string',
      note: 'string',
    };

    if (requestKeys.length < 5) {
      res.sendStatus(400);

      return;
    }

    requestKeys.forEach(key => {
      if (!requiredKeys[key]) {
        res.sendStatus(400);

        return;
      }

      if (key === 'spentAt' && !(requestBody[key] instanceof Date)) {
        res.sendStatus(400);

        return;
      }

      if ((key === 'userId' || key === 'amount')
      && typeof requestBody[key] !== 'number') {
        res.sendStatus(400);

        return;
      }

      if (typeof requestBody[key] !== 'string') {
        res.sendStatus(400);
      }
    });

    Object.assign(foundPurchase, { ...requestBody });
    res.statusCode = 200;
    res.send(foundPurchase);
  });
}

module.exports = {
  createServer,
};
