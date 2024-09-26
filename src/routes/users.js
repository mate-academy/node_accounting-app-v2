'use strict';

const express = require('express');
const router = express.Router();

let users = [];

const setInitialUsers = () => {
 users = [];
}

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('Error... user is not found');

    return;
  }

  res.send(foundUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find(user => user.id === +id);

  if (!foundUser) {
    res.statusCode = 404;
    res.send('Error... User is not found!');

    return;
  }

  users = users.filter(user => user.id !== +id);

  res.sendStatus(204);
});

router.post('/', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Error... Name is required!');

    return;
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
});

router.patch('/:id', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('Error... Name is required!');

    return;
  }

  const { id } = req.params;

  const foundUser = users.find(user => user.id === +id);

  if (!name) {
    res.statusCode = 400;
    res.send('Error... Name is required!');

    return;
  }

  Object.assign(foundUser, { name });
  res.send(foundUser);
});

module.exports = {
  router,
  users,
  setInitialUsers,
};
