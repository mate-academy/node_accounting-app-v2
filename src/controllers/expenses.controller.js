'use strict';

const expensesServices = require('../services/expenses.services');
const { findAll } = require('../services/users.services');

const getAll = (req, res) => {
  const allExpenses = expensesServices.findAll();
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = allExpenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(item => item.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(item => item.category === categories);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(item => item.spentAt > from && item.spentAt < to);
  }

  const responseExpenses = filteredExpenses.length > 0
    ? filteredExpenses
    : allExpenses;

  return res.send(responseExpenses);
};

const getById = (req, res) => {
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

  const findUser = findAll().find(user => user.id === userId);

  if (!title || !findUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getById(+id)) {
    return res.sendStatus(404);
  }

  expensesServices.remove(+id);

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

  const updatedExpenses = expensesServices.update(title, expenses);

  return res.send(updatedExpenses);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
