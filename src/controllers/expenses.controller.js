'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(expensesService.getExpenses(req.query));
};

const getOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send('id required!');

    return;
  }

  const expense = expensesService.getExpenseById(req.params.id);

  if (!expense) {
    res.status(404).send('expense not found');
  }

  res.send(expense);
};

const create = (req, res) => {
  const requiredFields
    = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];
  const errors = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      errors.push(`${field} required!`);
    }
  });

  if (errors.length) {
    res.status(400).send(errors);

    return;
  }

  const user = userService.getUserById(req.body.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const data = {
    userId: req.body.userId,
    spentAt: req.body.spentAt,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
  };

  res.status(201).send(expensesService.createExpense(data));
};

const remove = (req, res) => {
  const expense = expensesService.getExpenseById(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.status(404).send('expense not found');

    return;
  }

  res.send(expensesService.updateExpense(id, req.body));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
