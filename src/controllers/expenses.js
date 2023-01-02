'use strict';

const expenseServise = require('../services/expenses.js');
const userServise = require('../services/users.js');

let nextId = 0;

function create(req, res) {
  const {
    userId,
    title,
  } = req.body;

  if (!title || !userServise.exist(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    ...req.body,
    id: nextId++,
  };

  res.statusCode = 201;
  expenseServise.createExpense(newExpense);

  res.send(newExpense);
};

function get(req, res) {
  const expenses = expenseServise.getExpenses();

  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const id = Number(userId);

  if (typeof id !== 'number') {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 200;

  if (!expenses.length) {
    res.send([]);

    return;
  }

  if (from && to) {
    const userExpenses = expenseServise.filter(
      expense => expense.spentAt > from && expense.spentAt < to
    );

    res.send(userExpenses);

    return;
  }

  if (userServise.getUser(id)) {
    let userExpenses = expenseServise.filter(
      expense => expense.userId === id
    );

    if (category) {
      userExpenses = userExpenses.filter(
        expense => expense.category === category
      );
    }

    res.send(userExpenses);

    return;
  }

  res.send(expenseServise.getExpenses());
}

function getOne(req, res) {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
}

function update(req, res) {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.updateExpense(foundExpense.id, req.body);

  res.statusCode = 200;

  res.send(foundExpense);
}

function remove(req, res) {
  const expenseId = Number(req.params.id);

  const foundExpense = expenseServise.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.removeExpense(expenseId);
  res.sendStatus(204);
}

module.exports = {
  get,
  create,
  getOne,
  update,
  remove,
};
