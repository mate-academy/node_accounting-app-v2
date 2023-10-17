'use strict';

const service = require('../services/expenses.services');
const userService = require('../services/users.services');

const getExpenses = (req, res) => {
  const {
    userId,
    from,
    to,
  } = req.query;

  const normalizedUrl = new URL('http://localhost:3000/' + req.url);
  const categories = normalizedUrl.searchParams.getAll('categories');

  let expenses = service.getAll();

  if (userId) {
    expenses = expenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (categories.length) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).valueOf() >= new Date(from).valueOf())
    );
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).valueOf() <= new Date(to).valueOf())
    );
  }

  res.statusCode = 200;
  res.send(expenses);
};

const postExpense = (req, res) => {
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

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  service.add(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
};

const getOneExpense = (req, res) => {
  const id = +req.params.id;
  const expense = service.getById(id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const id = +req.params.id;
  const expense = service.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  service.remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = +req.params.id;

  if (!id || !req.body) {
    res.sendStatus(400);

    return;
  }

  if (!service.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(service.update(id, req.body));
};

module.exports = {
  getExpenses,
  postExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
