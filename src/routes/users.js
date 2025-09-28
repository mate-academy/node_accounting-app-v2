const express = require('express');
const { users } = require('../data/usersData');

const router = express.Router();

let nextId = 1;

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const newUser = {
    id: nextId++,
    name: req.body.name,
  };

  if (!newUser.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Невірний id' });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  user.name = req.body.name;

  res.status(200).json(user);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  users.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
