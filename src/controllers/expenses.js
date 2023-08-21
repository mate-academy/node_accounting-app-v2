'use strict';

const expensesServises = require('../services/expenses');
const userServices = require('../services/users');

function getAll(req, res) {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expensesServises.getAll({
    userId, from, to, categories,
  });

  res.send(filteredExpenses);
}

function getById(req, res) {
  const { id } = req.params;
  const foundExpenses = expensesServises.getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

function remove(req, res) {
  const { id } = req.params;
  const expenses = expensesServises.getAll();
  const filteredExpenses = expensesServises.remove(id);

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expensesServises.setFilteredExpenses(filteredExpenses);

  res.sendStatus(204);
}

function create(req, res) {
  const { userId, title, amount, category, note, spentAt } = req.body;

  if (!title || !amount || !category || !note || !userId || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const users = userServices.getAll();

  const userExists = users.some(user => user.id === +userId);

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServises.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
}

function update(req, res) {
  const { id } = req.params;
  const foundExpenses = expensesServises.getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const { title, category, note } = req.body;

  if ((title && typeof title !== 'string')
      || (category && typeof category !== 'string')
      || (note && typeof note !== 'string')) {
    res.sendStatus(400);
  }

  Object.assign(foundExpenses, {
    title: title || foundExpenses.title,
    category: category || foundExpenses.category,
    note: note || foundExpenses.note,
  });

  res.send({ ...foundExpenses });
}

module.exports = {
  getAll, getById, remove, create, update,
};
