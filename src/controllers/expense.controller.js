'use strict';

const expenseServise = require('.././services/expense.service');

const get = (req, res) => {
  res.send(expenseServise.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const userExpenses = expenseServise.getById(id);

  if (!userExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(userExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title || !amount || !category || !note || !spentAt || !userId) {
    res.sendStatus(404);

    return;
  }

  const newExpenses = expenseServise.create(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  expenseServise.remove(id);

  const userExpenses = expenseServise.getById(id);

  if (!userExpenses) {
    res.sendStatus(404);
  }

  res.statusCode = 204;
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const userExpenses = expenseServise.getById(id);

  if (!userExpenses) {
    res.sendStatus(404);

    return;
  }

  const newUser = expenseServise.update(
    spentAt, title, amount, category, note
  );

  res.statusCode = 200;
  res.send(newUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
