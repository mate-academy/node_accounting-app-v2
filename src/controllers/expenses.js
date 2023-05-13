/* eslint-disable no-fallthrough */
'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
  getAllForUser,
  getAllForCategory,
  getAllBetweenDates,
} = require('../services/expenses');

const { getById: getUserById } = require('../services/users');

const getAllExpenses = (req, res) => {
  const { userId } = req.query;
  const { categories } = req.query;
  const { from, to } = req.query;

  if (userId && !categories) {
    res.send(getAllForUser(userId));

    return;
  }

  if (userId && categories) {
    const userExpenses = getAllForUser(userId);

    res.send(getAllForCategory(userExpenses, categories));

    return;
  }

  if (from && to) {
    const timestampFrom = new Date(from).getTime();
    const timestampTo = new Date(to).getTime();

    res.send(getAllBetweenDates(timestampFrom, timestampTo));

    return;
  }

  res.send(getAll());
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const user = getUserById(req.body.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.sendStatus(400);

    return;
  }

  const newExpense = create({ ...req.body });

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  update(id, { ...req.body });

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses, getExpenseById, createExpense, removeExpense, updateExpense,
};
