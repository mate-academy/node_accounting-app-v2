'use strict';

const { users } = require('../data/users.js');
const expensesServices = require('./expenses.service.js');
const { expenses } = require('../data/expenses.js');

const userService = require('./user.service.js');

const getAll = (req, res) => {
  const result = userService.getAll();

  res.json(result);
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

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
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

const delUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const index = users.findIndex((user) => user.id === +id);

  if (index === -1) {
    res.sendStatus(404).end();

    return;
  }

  expenses.forEach((exp) => {
    if (exp.userId === +id) {
      expensesServices.delExpense(exp.id);
    }
  });

  userService.delUser(index);
  res.sendStatus(204).end();
};

module.exports = {
  getAll,
  getOne,
  addUser,
  editUser,
  delUser,
};
