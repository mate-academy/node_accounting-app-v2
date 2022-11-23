'use strict';

const { ExpenseService } = require('../services/expenseServise');
const { UserService } = require('../services/userService');

const expenseServise = new ExpenseService();
const userServise = new UserService();

const getAll = (req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(expenseServise.getAll());

    return;
  }

  res.send(expenseServise.getFiltered(searchParams));
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

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

  const foundUser = userServise.getUserById(+userId);

  const isEverythingCorrect
    = foundUser
    && spentAt
    && title
    && amount
    && category
    && note;

  if (!isEverythingCorrect) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServise.create(req.body);

  res.sendStatus(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServise.getById(+expenseId);

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.remove(+expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServise.getById(+expenseId);

  if (!foundExpense) {
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

  const isEverythingCorrect
  = spentAt
    && title
    && amount
    && category;

  if (!isEverythingCorrect) {
    res.sendStatus(400);

    return;
  }

  expenseServise.update({
    id: expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
