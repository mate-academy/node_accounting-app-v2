'use strict';

const expenseServise = require('../services/expenses.js');
const userServise = require('../services/users.js');

let nextId = 0;

function add(req, res) {
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

  expenseServise.add(newExpense);

  res.status(201).send(newExpense);
};

function getAll(req, res) {
  const expenses = expenseServise.getAll();

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

  if (userServise.findById(id)) {
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

  res.send(expenseServise.getAll());
}

function getById(req, res) {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
}

function update(req, res) {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.update(foundExpense.id, req.body);

  res.status(200).send(foundExpense);
}

function remove(req, res) {
  const expenseId = Number(req.params.id);

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.remove(expenseId);
  res.sendStatus(204);
}

module.exports = {
  getAll,
  add,
  getById,
  update,
  remove,
};
