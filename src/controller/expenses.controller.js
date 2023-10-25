'use strict';

const expensesServices = require('../services/expenses.service.js');
const { checkType } = require('../functions/checkType.js');
const { users } = require('../data/users.js');
const { expenses } = require('../data/expenses.js');

const getAll = (req, res) => {
  const params = {
    userId: +req.query.userId ? +req.query.userId : null,
    categories: req.query.categories ? [req.query.categories].flat() : null,
    from: req.query.from ? req.query.from : null,
    to: req.query.to ? req.query.to : null,
  };

  const result = expensesServices.getAll(params);

  res.json(result).end();
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400).end();

    return;
  }

  if (!expensesServices.getOne(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesServices.getOne(id)).status(200).end();
};

const addExpense = (req, res) => {
  if (
    ['userId', 'spentAt', 'title', 'amount', 'category'].every((key) =>
      Object.keys(req.body).includes(key),
    ) &&
    Object.entries(req.body).every((entry) => checkType(entry[0], entry[1])) &&
    users.some((user) => user.id === req.body.userId)
  ) {
    const expense = {
      id: Math.round(Math.random() * 1000000000),
      ...req.body,
    };

    expensesServices.addExpense(expense);
    res.status(201).send(expense).end();

    return;
  }

  res.sendStatus(400);
};

const delExpense = (req, res) => {
  const id = req.params.id;

  if (expensesServices.delExpense(id)) {
    res.sendStatus(404).end();

    return;
  }

  res.sendStatus(204).end();
};

const editExpense = (req, res) => {
  const id = +req.params.id;

  if (!expenses.some((exp) => exp.id === id)) {
    res.sendStatus(404);
  }

  const expense = req.body;

  expensesServices.editExpense(expense, id);
  res.send(expensesServices.editExpense(expense, id)).end();
};

module.exports = {
  getAll,
  addExpense,
  getOne,
  delExpense,
  editExpense,
};
