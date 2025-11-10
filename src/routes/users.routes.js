'use strict';

const express = require('express');
const {
  getUserById,
  patchUserById,
  deleteUserById,
} = require('./../controllers/users.controller');
const router = express.Router();

router.get('/', (req, res) => {
  const users = req.app.locals.users;

  res.json(users);
});

router.post('/', (req, res) => {
  const users = req.app.locals.users;
  const nextUserId = req.app.locals.nextUserId;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = { id: nextUserId(), name };

  users.push(user);

  res.status(201).json(user);
});

router.get('/:id', getUserById);
router.patch('/:id', patchUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
