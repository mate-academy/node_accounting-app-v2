'use strict';

const expensesServices = require('../services/expenses');
const userServices = require('../services/users');

function getAll(req, res) {
  const getQuery = req.query;
  const expenses = expensesServices.getAll(getQuery);

  res.send(expenses);
}

function getOne(req, res) {
  const { expensesId } = req.params;

  const foundExpenses = expensesServices.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

function addNew(req, res) {
  const { userId, title, amount, category, note, spentAt } = req.body;
  const user = userServices.getById(userId);

  if (!user || !userId || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newUser = expensesServices.addNew({
    userId,
    title,
    amount,
    category,
    note,
    spentAt,
  });

  res.statusCode = 201;
  res.send(newUser);
}

function remove(req, res) {
  const { expensesId } = req.params;

  const foundUser = expensesServices.getById(expensesId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expensesId);
  res.sendStatus(204);
}

function change(req, res) {
  const { expensesId } = req.params;
  const foundExpenses = expensesServices.getById(expensesId);

  const newParams = req.body;

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesServices.change(expensesId, newParams);

  res.send(foundExpenses);
}

module.exports = {
  getOne,
  getAll,
  addNew,
  change,
  remove,
};
