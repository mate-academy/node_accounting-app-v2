'use strict';

const express = require('express');
const cors = require('cors');
const {
  getAllUsers,
  getUser,
  createUserId,
  addUser,
  removeUser,
  updateUser,
} = require('./services/users.service');

const {
  getAllExpences,
  getAllFilteredExpences,
  getExpenceById,
  validatePostData,
  createExpenceId,
  addExpence,
  removeExpence,
  updateExtence,
} = require('./services/expences.service');
const app = express();

function createServer() {
  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(getAllUsers());
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    if (!getUser()) {
      res.sendStatus(404);

      return;
    }

    res.send(getUser());
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: createUserId(),
      name,
    };

    addUser(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!getUser(id)) {
      res.sendStatus(404);

      return;
    }

    removeUser(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!getUser(id)) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    updateUser(id, name);

    res.send(getUser(id));
  });

  app.get('/expences', (req, res) => {
    const { userId, categories, from, to } = req.query;

    res.send(getAllFilteredExpences(userId, categories, from, to));
  });

  app.get('/expences/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
    }

    if (!getExpenceById(id)) {
      res.sendStatus(404);
    }

    res.send(getExpenceById(id));
  });

  app.post('/expences', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!validatePostData(userId, spentAt, title, amount, category)) {
      res.sendStatus(422);

      return;
    }

    const newExpence = {
      id: createExpenceId(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    addExpence(newExpence);
    res.statusCode = 201;
    res.send(newExpence);
  });

  app.delete('/expences/:id', (req, res) => {
    const { id } = req.params;

    if (!getExpenceById(id)) {
      res.sendStatus(400);

      return;
    }

    removeExpence(id);

    res.sendStatus(204);
  });

  app.patch('/expences/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!getExpenceById(id)) {
      res.sendStatus(404);

      return;
    }

    updateExtence(id, userId, spentAt, title, amount, category, note);

    res.send(getExpenceById(id));
  });

  return app;
}

module.exports = {
  createServer,
};
