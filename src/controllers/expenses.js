'use strict';

const expensesServices = require('../services/expenses.js');
const usersServices = require('../services/users.js');

function getAll(req, res) {
  const { userId, category, from, to } = req.query;

  const foundedExpenses = expensesServices.getAll(userId, category, from, to);

  if (!foundedExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpenses);
}

function getById(req, res) {
  const expensesId = Number(req.params.expensesId);

  const foundExpense = expensesServices.getOne(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function add(req, res) {
  const { title, category, note, userId, spentAt, amount } = req.body;

  const isUserIdExist = usersServices.getOne(userId);

  if (!title || !category || !note || !isUserIdExist || !spentAt || !amount) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.create(
    title, category, note, userId, spentAt, amount);

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expensesId } = req.params;
  const foundExpense = expensesServices.getOne(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expensesId);

  res.sendStatus(204);
}

function update(req, res) {
  const { expensesId } = req.params;
  const foundExpense = expensesServices.getOne(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.update(req.body, expensesId);

  res.statusCode = 200;
  res.send(foundExpense);
}

module.exports = {
  getAll, getById, add, remove, update,
};
