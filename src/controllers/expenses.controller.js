'use strict';

const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  editExpense,
} = require('../services/expenses.service.js');

const {
  getUser
} = require('../services/users.service.js');

function getAllExpenses(req, res) {
  const {
    userId,
    categories,
    from,
    to
  } = req.query;
  const result = getExpenses(userId, categories, from, to);

  res.status(200).send(result);
};

function createNewExpense(req, res) {
  const { body } = req;
  const { userId } = body;

  if (Object.keys(body).length === 0) {
    res.sendStatus(400);
    return;
  }

  const user = getUser(+userId);

  if (!user) {
    res.sendStatus(400);
    return;
  }

  res.status(201).send(createExpense(body));
};

function getExpenseById(req, res) {
  const { id } = req.params;

  const expense = getExpense(+id);

  if (!expense) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(expense);
};

function deleteExpenseById(req, res) {
  const { id } = req.params;

  const result = deleteExpense(+id);

  if (!result) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};

function editExpenseField(req, res) {
  const { id } = req.params;
  const { body } = req;

  const result = editExpense(+id, body);

  if (!result) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(result);
}

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpenseById,
  deleteExpenseById,
  editExpenseField,
};
