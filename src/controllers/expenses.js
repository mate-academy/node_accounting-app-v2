'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAll = (req, res) => {
  const {
    userId: userIdStr,
    categories,
    from: fromStr,
    to: toStr,
  } = req.query;

  const userId = isNaN(Number(userIdStr))
    ? null
    : Number(userIdStr);

  const from = isNaN(new Date(fromStr).getTime())
    ? null
    : new Date(fromStr).getTime();

  const to = isNaN(new Date(toStr).getTime())
    ? null
    : new Date(toStr).getTime();

  if (
    (userIdStr && !userId)
    || (fromStr && !from)
    || (toStr && !to)
  ) {
    res.sendStatus(400);

    return;
  }

  const options = {
    userId,
    categories,
    from,
    to,
  };

  const expenses = expensesService.getAll(options);

  res.send(expenses);
};

const getOne = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense
    = expensesService.create(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId = foundExpense.userId,
    spentAt = foundExpense.spentAt,
    title = foundExpense.title,
    amount = foundExpense.amount,
    category = foundExpense.category,
    note = foundExpense.note,
  } = req.body;

  if (!userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  expensesService.update({
    id: expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
