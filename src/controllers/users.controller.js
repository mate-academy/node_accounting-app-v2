'use strict';

const {
  users,
  expenses,
  nextUserId,
  findUser,
  toNum,
} = require('../db/memory');

const createUser = (req, res) => {
  const body = req.body || {};
  const { name } = body;

  if (!name) {
    return res.status(400).json({ message: 'name is required' });
  }

  const user = { id: nextUserId(), name };

  users.push(user);

  return res.status(201).json(user);
};

const listUsers = (_req, res) => res.json(users);

const getUser = (req, res) => {
  const id = toNum(req.params.id);
  const user = findUser(id);

  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json(user);
};

const updateUser = (req, res) => {
  const id = toNum(req.params.id);
  const user = findUser(id);

  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }

  const body = req.body || {};

  if (typeof body.name !== 'undefined') {
    user.name = body.name;
  }

  return res.json(user);
};

const deleteUser = (req, res) => {
  const id = toNum(req.params.id);
  const idx = users.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  users.splice(idx, 1);

  for (let i = expenses.length - 1; i >= 0; i -= 1) {
    if (expenses[i].userId === id) {
      expenses.splice(i, 1);
    }
  }

  return res.status(204).end();
};

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
