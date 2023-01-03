'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

function getAll(req, res) {
  const { userId, from, to, category } = req.query;
  const expenses = expenseService.getAll(Number(userId), from, to, category);

  res.send(expenses);
}

function getOne(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getOne(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function addOne(req, res) {
  const {
    userId, spentAt, title, amount, category, note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getOne(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addOne(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
}

function deleteOne(req, res) {
  const { expenseId } = req.params;

  const isDeleted = expenseService.deleteOne(Number(expenseId));

  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateOne(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getOne(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId, spentAt, title, amount, category, note,
  } = req.body;

  if (userId !== undefined && !userService.getOne(userId)) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expenseService.updateOne(Number(expenseId), {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
