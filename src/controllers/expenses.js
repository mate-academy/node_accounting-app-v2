'use strict';

const expenseService = require('../service/expenses');

const getAll = (req, res) => {
  const filterBy = req.query;

  if (!filterBy) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService(filterBy));
};

const getExpense = (req, res) => {
  let { expenseId } = req.params;

  expenseId = +expenseId;

  if (isNaN(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const foundExpense = expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  let { expenseId } = req.params;

  expenseId = +expenseId;

  if (isNaN(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const remainedExpenses = expenseService.deleteExpense(expenseId);

  if (remainedExpenses.length === expenseService.getAll.length) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  let { expenseId } = req.params;

  expenseId = +expenseId;

  if (isNaN(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const foundExpense = expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateExpense(expenseId, ...req.body);

  res.send(updatedExpense);
};

const addNewExpense = (req, res) => {
  const { userId,
    spentAt,
    title,
    amount,
    category,
    note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  };

  if (!getAll().userId.includes(userId)) {
    res.sendStatus(400);

    return;
  }

  if (
    typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  };

  const newExpense = expenseService.addExpense(req.body);

  res.status(201);
  res.send(newExpense);
};

module.exports = {
  getAll,
  getExpense,
  deleteExpense,
  addNewExpense,
  updateExpense,
};
