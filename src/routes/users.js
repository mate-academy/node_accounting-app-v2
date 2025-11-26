const express = require('express');
const { users, getNextUserId } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = { name, id: getNextUserId() };

  users.push(user);

  res.status(201).json(user);
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json(user);
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const idx = users.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  users.splice(idx, 1);

  res.sendStatus(204);
});

router.patch('/:id', (req, res) => {
  const id = +req.params.id;
  const name = req.body.name;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Bad request' });
  }

  user.name = name;

  res.status(200).json(user);
});

module.exports = router;
