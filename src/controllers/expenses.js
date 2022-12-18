'use strict';

const { ExpenseService } = require('../services/expenseService');
const { UserService } = require('../services/userService');

const expenseService = new ExpenseService();
const userService = new UserService();

const getAll = (req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(expenseService.getAll());

    return;
  }

  res.send(expenseService.getFiltered(searchParams));
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId || isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
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

  const foundUser = userService.getUserById(Number(userId));

  const isEverythingCorrect = foundUser
    && spentAt
    && title
    && amount
    && category
    && note;

  if (!isEverythingCorrect) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.sendStatus(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const hasDeleted = expenseService.remove(Number(expenseId));

  if (!hasDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenseService.getById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isEverythingCorrect = spentAt
    || title
    || amount
    || category
    || note;

  if (!isEverythingCorrect || isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  expenseService.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
