'use strict';

const userServices = require('../services/userServices');
const expenseServices = require('../services/expenseServices');

function getAllExpenses(req, res) {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const filteredExpenses = expenseServices
    .getExpenses(userId, categories, from, to);

  res.send(filteredExpenses);
}

function getExpenseByUserId(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServices.getExpenseByUserId(userId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpense);
}

function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpense);
}

function remove(req, res) {
  const { id } = req.params;

  const isExpenseExist = expenseServices.getExpenseById(id);

  if (!isExpenseExist) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(id);
  res.sendStatus(204);
}

function update(req, res) {
  const { id } = req.params;

  const foundExpense = expenseServices.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.update(foundExpense, req);

  res.status(200);
  res.send(foundExpense);
}

module.exports = {
  getAllExpenses,
  getExpenseByUserId,
  create,
  remove,
  update,
};
