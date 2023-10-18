'use strict';

const service = require('../services/expenses.services');
const { getById: getUserById } = require('../services/users.services');
const {
  OK, BAD_REQUEST, NOT_EXIST, CREATED, SUCCES_NO_CONTENT,
} = require('../statusCodes');

const getAllExpenses = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  // const normalizedUrl = new URL('http://localhost:3000/' + req.url);

  // const categories = normalizedUrl.searchParams.getAll('categories');

  let expenses = service.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (from) {
    expenses = expenses.filter(expense =>
      new Date(expense.spentAt).valueOf() >= new Date(from).valueOf());
  }

  if (to) {
    expenses = expenses.filter(expense =>
      new Date(expense.spentAt).valueOf() <= new Date(to).valueOf());
  }

  if (categories) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  res.statusCode = OK;
  res.send(expenses);
};

const getExpense = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const searchedExpense = service.getById(id);

  if (!searchedExpense) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  res.statusCode = OK;
  res.send(searchedExpense);
};

const post = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!getUserById(Number(userId))) {
    res.sendStatus(BAD_REQUEST);

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

  service.add(newExpense);
  res.statusCode = CREATED;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const id = Number(req.params.id);
  const expenseToRemove = service.getById(id);

  if (!expenseToRemove) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  service.remove(id);
  res.sendStatus(SUCCES_NO_CONTENT);
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  if (!id || !body) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  if (!service.getById(id)) {
    res.sendStatus(NOT_EXIST);

    return;
  }

  const updatedExpense = service.update(id, body);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  post,
  removeExpense,
  updateExpense,
};
