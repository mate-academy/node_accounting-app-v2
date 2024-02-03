'use strict';

const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.serveces');

const getAllExpenses = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.body;

  if (!userId || !categories || !from || !to) {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';

    return;
  }

  res.sendStatus(200);
  res.send(getExpenses(userId, categories, from, to));
};

const createOneExpense = (req, res) => {
  const {
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  } = req.body;

  if (!userId || !category || !spentAt || !title || !amount) {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';

    return;
  }

  const expense = createExpense(
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  );

  res.sendStatus(201);

  res.send(expense);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  const expense = getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(expense);
};

const deleteOneExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The name is invalid';

    return;
  }

  const expense = getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(id);

  res.sendStatus(204);
};

const updateOneExpense = (req, res) => {
  const { id } = req.params;
  const {
    title,
    spentAt,
    category,
    amount,
    note,
  } = req.body;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The name is invalid';

    return;
  }

  const expense = getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || typeof spentAt !== 'string'
    || typeof amount !== 'number') {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';

    return;
  }

  const updatedUser = updateExpense({
    id,
    title,
    spentAt,
    category,
    amount,
    note,
  });

  res.sendStatus(200);
  res.send(updatedUser);
};

module.exports = {
  getAllExpenses,
  createOneExpense,
  getOneExpense,
  deleteOneExpense,
  updateOneExpense,
};
