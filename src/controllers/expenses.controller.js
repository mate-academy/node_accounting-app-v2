'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

function getAll(req, res) {
  const { userId, categories, from, to } = req.query;

  res.send(
    expensesService.getAll({
      userId,
      categories,
      from,
      to,
    }),
  );
}

function getOne(req, res) {
  const expense = expensesService.getById(Number(req.params.id));

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    res.status(400).send('Required fields are missing');

    return;
  }

  if (!usersService.getById(userId)) {
    res.status(400).send('User not found');

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
}

function update(req, res) {
  const id = Number(req.params.id);

  if (!expensesService.getById(id)) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expensesService.update(id, req.body));
}

function remove(req, res) {
  const id = Number(req.params.id);

  if (!expensesService.getById(id)) {
    res.status(404).send('Expense not found');

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
