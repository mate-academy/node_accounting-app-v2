'use strict';

const expenseService = require('../services/expenses');
const userGetById = require('../services/users').getById;

function getAll(req, res) {
  const { userId, category, from, to } = req.query;
  const expenses = expenseService.getAll();

  if (userId) {
    const foundExpenses = expenses.filter(expense => (
      expense.userId === Number(userId)
    ));

    res.send(foundExpenses);
    res.sendStatus = 200;

    return;
  }

  if (category) {
    const foundExpenses = expenses.filter(expense => (
      expense.category === category
    ));

    res.send(foundExpenses);
    res.sendStatus = 200;

    return;
  }

  if (from && to) {
    const foundExpenses = expenses.filter(({ spentAt }) => (
      spentAt > from && spentAt < to
    ));

    res.send(foundExpenses);
    res.sendStatus = 200;

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
}

function getOne(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

function add(req, res) {
  const {
    title,
    amount = 0,
    category = '',
    note = '',
    userId,
  } = req.body;

  const foundUser = userGetById(userId);

  if (!foundUser || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    title,
    amount,
    category,
    note,
    userId,
  );

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    title,
    amount = 0,
    category = '',
    note = '',
  } = req.body;

  if (typeof title !== 'string') {
    res.sendStatus(422);

    return;
  }

  expenseService.update({
    expenseId,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
}

module.exports = {
  getAll,
  getOne,
  update,
  add,
  remove,
};
