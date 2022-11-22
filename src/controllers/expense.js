'use strict';

const expenseServices = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const { userId, category, from, to } = req.query;

  if (!category || !userId || !from || !to) {
    res.sendStatus(422);

    return;
  }

  const findExpenses = expenseServices.getAllExpenses(
    userId,
    from,
    to,
    category
  );

  if (!findExpenses.length) {
    res.sendStatus(404);

    return;
  }

  res.send(findExpenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseServices.getExpense(expenseId)) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseServices.getExpense(expenseId));
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const status = expenseServices.deleteExpense(expenseId);

  if (!status) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
};

const createNewExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.createNewExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!expenseId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const status = expenseServices.updateExpense(
    expenseId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  if (!status) {
    res.sendStatus(404);

    return;
  }

  res.send(status);
};

module.exports.getAllExpenses = getAllExpenses;
module.exports.getExpense = getExpense;
module.exports.deleteExpense = deleteExpense;
module.exports.createNewExpense = createNewExpense;
module.exports.updateExpense = updateExpense;
