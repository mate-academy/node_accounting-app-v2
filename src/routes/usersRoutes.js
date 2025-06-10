const express = require('express');

const {
  getAllUsers,
  getUser,
  addUser,
  removeUser,
  changeUser,
} = require('../controllers/usersController');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  const users = getAllUsers();

  res.send(users);
});

usersRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  const user = getUser(userId);

  if (!user) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  res.status(200).send(user);
});

usersRouter.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  const user = addUser(name);

  res.status(201).send(user);
});

usersRouter.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  const isUserRemoved = removeUser(userId);

  if (isUserRemoved) {
    res.sendStatus(204);

    return;
  }

  res.status(404).send({ message: 'User not found' });
});

usersRouter.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  if (!userId) {
    res.status(400).send({ message: 'User ID is required' });

    return;
  }

  if (Object.keys(body).length === 0) {
    res.status(400).send({ message: 'Request body cannot be empty' });

    return;
  }

  const user = changeUser(userId, body);

  if (user === -1) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  res.status(200).send(user);
});

module.exports = {
  usersRouter,
};
