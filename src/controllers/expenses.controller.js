'use strict';

const { ERRORS } = require('../utils/constants');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
  } = req.query;

  const normalizedURL = new URL('http://localhost:3000/' + req.url);

  const categories = normalizedURL.searchParams.getAll('categories');

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories.length) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) >= Number(new Date(from))
        && Number(new Date(expense.spentAt)) <= Number(new Date(to)));
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const id = Number(req.params.id);

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  res.send(expense);
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

  const user = usersService.getById(Number(userId));

  if (!user) {
    res.sendStatus(ERRORS.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = expensesService.add(newExpense);

  res.statusCode = ERRORS.NEW_RESOURCE_CREATED;

  res.send(expense);
};

const update = (req, res) => {
  const id = Number(req.params.id);

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.updateById(id, req.body);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(ERRORS.NOT_FOUND);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(ERRORS.NO_MESSAGE_BODY);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
