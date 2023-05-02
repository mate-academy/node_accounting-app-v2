'use strict';

const { service: expenseService } = require('../services/expenses');
const { service: userService } = require('../services/users');

const getAll = (req, res) => {
  const urlSplit = req.url.split('?');
  const queryString = urlSplit[1] || '';
  const searchParams = new URLSearchParams(queryString);

  const userId = searchParams.get('userId');
  const categories = searchParams.getAll('categories');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const filterOptions = {
    userId,
    categories,
    from,
    to,
  };

  const foundExpenses = expenseService.getAll(filterOptions);

  res.statusCode = 200;
  res.send(foundExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeById(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(foundExpense, req.body);

  res.statusCode = 200;
  res.send(foundExpense);
};

const controller = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports.controller = controller;
