const express = require('express');
const { users, getNextUserId } = require('../data/store');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// CREATE new user
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const newUser = { id: getNextUserId(), name };

  users.push(newUser);

  res.status(201).json(newUser);
});

// UPDATE user
router.patch('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  user.name = name;
  res.json(user);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
