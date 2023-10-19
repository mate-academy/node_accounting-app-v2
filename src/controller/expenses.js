'use strict';

const expensesServices = require('../services/expensesServices');
const usersServices = require('../services/usersServices');
const {
  NO_CONTENT, NOT_FOUND, BAD_REQUEST, STATUS_OK, STATUS_CREATED,
} = require('../utils/constants');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesServices.getAll();

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= new Date(from))
    );
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) <= new Date(to))
    );
  }

  if (categories) {
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses
      .filter(expense => categoriesArray.includes(expense.category));
  }

  res.statusCode = STATUS_OK;
  res.send(expenses);
};

const getById = (req, res) => {
  const expenseId = Number(req.params.id);

  if (!expenseId) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_OK;
  res.send(foundExpense);
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

  if (!title || !userId || !category || !note || !amount || !spentAt) {
    res.sendStatus(BAD_REQUEST);
    res.send('Fill all fields');

    return;
  }

  const foundUser = usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(BAD_REQUEST);
    res.send('User is not found');

    return;
  }

  const newExpense = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = STATUS_CREATED;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.id);
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  expensesServices.remove(expenseId);
  res.sendStatus(NO_CONTENT);
};

const update = (req, res) => {
  const expenseId = Number(req.params.id);

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(NOT_FOUND);
    res.send('Expense is not found');

    return;
  }

  const updatedExpense = expensesServices.update(expenseId, req.body);

  res.statusCode = STATUS_OK;
  res.send((updatedExpense));
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
