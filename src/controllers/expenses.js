/* eslint-disable no-console */
'use strict';

const expensesServices = require('../services/expenses');

function getAll(req, res) {
  const getQuery = req.query;
  const expenses = expensesServices.getAll(getQuery);

  res.send(expenses);
}

function getOne(req, res) {
  const { expensesId } = req.params;

  console.log(expensesId);

  const foundExpenses = expensesServices.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

function addNew(req, res) {
  const { userId, title, amount, category, note } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.sendStatus(422);
  }

  const newUser = expensesServices.addNew({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.send(newUser);

  res.sendStatus(201);
}

function remove(req, res) {
  const { expensesId } = req.params;

  console.log(expensesId);

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

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const { userId, title, amount, category, note } = req.body;

  if (
    typeof title !== 'string'
    || typeof +amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(422);

    return;
  }

  expensesServices.change({
    expensesId,
    userId,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpenses);
}

module.exports = {
  getOne,
  getAll,
  addNew,
  change,
  remove,
};
