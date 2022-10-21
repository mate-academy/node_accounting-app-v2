'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  let usersData = [];
  let exprensesData = [];

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredData = usersData.filter(user => user.id !== +userId);

    if (filteredData.length === usersData.length) {
      res.sendStatus(404);
    } else {
      usersData = filteredData;
      res.status(204);
      res.send(usersData);
    }
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUserId = usersData.find(user => user.id === +userId);

    if (!foundUserId) {
      res.sendStatus(404);
    } else {
      const { name } = req.body;

      Object.assign(foundUserId, { name });

      res.send(foundUserId);
    }
  });

  app.get('/users', (req, res) => {
    if (!usersData) {
      res.send([]);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(usersData);
    }
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUserId = usersData.find(user => user.id === +userId);

    if (!foundUserId) {
      res.status(404);
    }

    res.send(foundUserId);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    const newUser = {
      id: Math.random(),
      name,
    };

    if (!name) {
      res.status(400);
      res.end();
    } else {
      usersData.push(newUser);
      res.setHeader('Content-Type', 'application/json');
      res.status(201);
      res.send(newUser);
    }
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;

    const foundUserId = usersData.find(user => user.id === +userId);

    if (!foundUserId) {
      res.status(400);
      res.end();
    } else {
      const newExprenses = {
        id: Math.random(),
        ...req.body,
      };

      exprensesData.push(newExprenses);
      res.setHeader('Content-Type', 'application/json');
      res.status(201);
      res.send(newExprenses);
    }
  });

  app.get('/expenses', (req, res) => {
    const queryCheck = Object.keys(req.query).length;

    if (!exprensesData) {
      res.send([]);
    } else if (queryCheck === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(exprensesData);
    } else {
      if (req.query.userId) {
        const filterDataUserId = exprensesData.filter(
          exprens => exprens.userId === +req.query.userId);

        if (req.query.category) {
          const filterDataCategory = exprensesData.filter(
            exprens => exprens.category === req.query.category);

          res.send(filterDataCategory);

          return;
        }
        res.send(filterDataUserId);
      }

      if (req.query.from) {
        const filterDataDate = exprensesData.filter(
          exprens => {
            return (req.query.from <= exprens.spentAt
              && exprens.spentAt <= req.query.to);
          });

        res.send(filterDataDate);

        return;
      }
    }
    res.end();
  }
  );

  app.get('/expenses/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUserId = exprensesData.find(user => user.id === +userId);

    if (!foundUserId) {
      res.status(404);
    }

    res.send(foundUserId);
  });

  app.delete('/expenses/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredData = exprensesData.filter(user => user.id !== +userId);

    if (filteredData.length === exprensesData.length) {
      res.sendStatus(404);
    } else {
      exprensesData = filteredData;
      res.status(204);
      res.send(exprensesData);
    }
  });

  app.patch('/expenses/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUserId = exprensesData.find(user => user.id === +userId);

    if (!foundUserId) {
      res.sendStatus(404);
    } else {
      const { title } = req.body;

      Object.assign(foundUserId, { title });

      res.send(foundUserId);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
