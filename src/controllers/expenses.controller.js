'use strict';

const expensesServices = require('../services/expenses.services');
const { findAll } = require('../services/users.services');

const getAll = (req, res) => {
  const allExpenses = expensesServices.findAll();
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = allExpenses;

  if (categories && userId) {
    filteredExpenses = allExpenses
      .filter(item => item.category === categories && item.userId === +userId);
  } else if (userId) {
    filteredExpenses = allExpenses
      .filter(item => item.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(item => item.spentAt > from && item.spentAt < to);
  }

  return res.send(filteredExpenses.length > 0 ? filteredExpenses : allExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expenses = expensesServices.getById(+id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  return res.json(expenses);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const findUser = findAll().find(u => u.id === userId);

  if (!title || !findUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesServices.createOne({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpenses);
};

const deleted = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getById(+id)) {
    return res.sendStatus(404);
  }

  expensesServices.deleteOne(+id);

  return res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expenses = expensesServices.getById(+id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  const updatedExpenses = expensesServices.updateOne(title, expenses);

  return res.send(updatedExpenses);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleted,
  update,
};
