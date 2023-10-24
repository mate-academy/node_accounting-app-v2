'use strict';

const { users } = require('../data/users.js');
const expensesServices = require('./expenses.service.js');
const { expenses } = require('../data/expenses.js');

const userService = require('./user.service.js');

const getAll = async (req, res) => {
  try {
    const result = await userService.getAll();

    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

const getOne = (req, res) => {
  const id = req.params.id;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getOne(id);

  if (!user) {
    res.sendStatus(404).end();

    return;
  }

  res.send(user).end();
};

const addUser = (req, res) => {
  if (
    Object.keys(req.body).length !== 1 ||
    Object.keys(req.body)[0] !== 'name' ||
    typeof Object.values(req.body)[0] !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }
  res.status(201).send(userService.addUser(req.body)).end();
};

const editUser = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (!userIndex) {
    res.sendStatus(404).end();

    return;
  }

  if (
    Object.keys(req.body).length !== 1 ||
    Object.keys(req.body)[0] !== 'name' ||
    typeof Object.values(req.body)[0] !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const name = req.body.name;

  userService.editUser(userIndex, name);

  res.send(userService.editUser(userIndex, name)).end();
};

const delUser = async (req, res) => {
  const userId = +req.params.id;

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const index = users.findIndex((user) => user.id === userId);

  if (index < 0) {
    res.sendStatus(404).end();

    return;
  }

  expenses.forEach((exp) => {
    if (exp.userId === userId) {
      expensesServices.delExpense(exp.id);
    }
  });

  await userService.delUser(index);
  res.sendStatus(204).end();
};

module.exports = {
  getAll,
  getOne,
  addUser,
  editUser,
  delUser,
};
