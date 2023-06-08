'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

function getAll(req, res) {
  res.statusCode = 200;
  res.send(expensesService.getAll(req.query));
}

function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const spentAtDate = new Date(spentAt);

  if (!isFinite(userId) || !isFinite(spentAtDate)
    || typeof title !== 'string' || typeof category !== 'string'
    || typeof note !== 'string' || !isFinite(amount)
    || !usersService.findUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  const newExpense = {
    userId: +userId,
    spentAt: spentAtDate,
    title,
    amount,
    category,
    note,
  };

  const createdExppense = expensesService.create(newExpense);

  res.send(createdExppense);
}

function update(req, res) {
  const id = Number(req.params.id);

  const expense = expensesService.findExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (!Object.keys(req.body).length) {
    res.sendStatus(400);

    return;
  }
  expensesService.update(req.body, expense);

  res.statusCode = 200;
  res.send(expense);
};

function remove(req, res) {
  const id = Number(req.params.id);
  const foundedExpenses = expensesService.findExpensesById(id);

  if (!foundedExpenses) {
    res.sendStatus(404);

    return;
  }
  expensesService.remove(id);
  res.sendStatus(204);
};

function getOne(req, res) {
  const id = req.params.id;

  if (!isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.findExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

module.exports = {
  getAll,
  add,
  update,
  getOne,
  remove,
};
