const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

let users = [];

const getUserById = (id) => {
  return users.find((user) => user.id === +id);
};

const initUsers = () => {
  users = [];
};

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = {
    id: generateUniqNumberId(),
    name,
  };

  users.push(user);
  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const currentUser = getUserById(id);

  if (!currentUser) {
    return res.sendStatus(404);
  }
  res.status(200).json(currentUser);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userExists = users.find((user) => Number(user.id) === Number(id));

  if (!userExists) {
    return res.sendStatus(404);
  }
  users = users.filter((user) => Number(user.id) !== Number(id));
  res.sendStatus(204);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const currentUser = users.find((user) => Number(user.id) === Number(id));

  if (!currentUser) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }
  Object.assign(currentUser, { name });
  res.status(200).json(currentUser);
});

module.exports = {
  router,
  users,
  initUsers,
  getUserById,
};
