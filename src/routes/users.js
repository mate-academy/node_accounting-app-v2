const express = require('express');
const router = express.Router();

const users = [];
let nextUserId = 1;

// GET /users - Return all users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// POST /users - Create a new user
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = { id: nextUserId++, name };

  users.push(newUser);
  res.status(201).json(newUser);
});

// GET /users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

// DELETE /users/:id - Delete user by ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.sendStatus(204);
});

// PATCH /users/:id - Update user name
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  user.name = name;
  res.status(200).json(user);
});

module.exports = { router, users };
