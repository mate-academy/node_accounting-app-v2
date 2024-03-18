'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const userExpenses = expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(200);
  res.send(userExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isExistUser = userService.getById(+userId);

  if (!isExistUser) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expenseToUpdate = expenseService.getById(+id);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const body = req.body;
  const updatedExpense = expenseService.update(body, +id);

  res.status(200);
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
