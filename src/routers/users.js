const express = require('express');
const { users, getNextUserId } = require('../data/store');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = { id: getNextUserId(), name };

  users.push(newUser);

  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  user.name = name;

  res.json(user);
});

router.delete('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);

  res.sendStatus(204);
});

module.exports = router;
