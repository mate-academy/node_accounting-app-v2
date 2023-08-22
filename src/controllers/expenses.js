'use strict';

const expensesServices = require('../services/expenses.js');
const userServices = require('../services/users.js');

const getAll = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expenses = expensesServices.getAllExp({
    userId, from, to, categories,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getExpById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExp({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getExpById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExp(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getExpById(expenseId);

  const { body } = req;

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExp = expensesServices.updateExp(expenseId, body);

  res.send(updatedExp);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
