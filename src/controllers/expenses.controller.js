'use strict';

const expensesService = require('./../services/expenses.service');
const userService = require('./../services/users.service');

const get = (req, res) => {
  const {
    userId,
    from,
    to,
  } = req.query;

  const normalizeUrl = new URL('http://localhost:3000/' + req.url);

  const categories = normalizeUrl.searchParams.getAll('categories');

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories.length) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    expenses = expenses
      .filter(expense => +new Date(expense.spentAt) >= +new Date(from)
      && +new Date(expense.spentAt) <= +new Date(to));
  }

  res.send(expenses);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(+userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.add(expense);

  res.statusCode = 201;

  res.send(expense);
};

const getOne = (req, res) => {
  const id = +req.params.id;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const deleteOne = (req, res) => {
  const id = +req.params.id;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeById(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.updateById(id, req.body));
};

module.exports = {
  get,
  create,
  getOne,
  deleteOne,
  update,
};
