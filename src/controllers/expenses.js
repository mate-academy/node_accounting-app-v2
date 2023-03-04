'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const ExpenseData = {
  userId: 'number',
  title: 'string',
  category: 'string',
  note: 'string',
  amount: 'number',
  spentAt: 'Date',
};

const validateProperties = data => {
  for (const key in data) {
    switch (ExpenseData[key]) {
      case 'string':
        if (typeof data[key] !== 'string') {
          return false;
        }
        break;

      case 'number':
        if (typeof data[key] !== 'number') {
          return false;
        }
        break;

      case 'Date':
        if (!Date.parse(data.spentAt)) {
          return false;
        }
        break;

      default:
        //
    }
  }

  return true;
};

const getAll = (req, res) => {
  const users = expensesService.getAll(req.query);

  res.send(users);
};

const getById = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const user = expensesService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const data = req.body;
  const hasRequiredFields = Object.keys(ExpenseData)
    .every(key => data.hasOwnProperty(key));

  const hasValidData = validateProperties(data);
  const hasUser = !!usersService.getById(data.userId);

  if (!hasValidData || !hasUser || !hasRequiredFields) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.add(data);

  res.statusCode = 201;
  res.send(expense);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;
  const hasRequiredField = Object.keys(ExpenseData)
    .some(key => data.hasOwnProperty(key));
  const hasValidData = validateProperties(data);

  if (!hasRequiredField || !hasValidData) {
    res.sendStatus(422);

    return;
  }

  const user = expensesService.update(id, data);

  res.send(user);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
