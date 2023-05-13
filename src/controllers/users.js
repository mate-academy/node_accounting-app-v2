'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/users');

const {
  getAllForUser,
  remove: removeExpense,
} = require('../services/expenses');

const getAllUsers = (req, res) => {
  const users = getAll();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  const userExpenses = getAllForUser(id);

  userExpenses.forEach(expense => removeExpense(expense.id));

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const foundUser = getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  update({
    id, name,
  });

  res.send(foundUser);
};

module.exports = {
  getAllUsers, getUserById, createUser, removeUser, updateUser,
};
