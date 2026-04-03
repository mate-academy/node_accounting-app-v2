'use strict';

const express = require('express');
const { users } = require('../models/users');

const router = express.Router();

function getNextId(collection) {
  return (
    Object.keys(collection).reduce((maxId, key) => {
      return Math.max(maxId, Number(key));
    }, 0) + 1
  );
}

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required parameter: name' });
  }

  const id = getNextId(users);

  users[id] = { id, name };
  res.status(201).json(users[id]);
});

router.get('/', (req, res) => {
  res.status(200).json(Object.values(users));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  delete users[id];
  res.status(204).send();
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = users[id];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name !== undefined) {
    user.name = name;
  }

  res.status(200).json(user);
});

module.exports = router;
