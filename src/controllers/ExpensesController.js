'use strict';

const { expenseService } = require('../services/expenseService');
const { userService } = require('../services/userService');

const getAll = (req, res) => {
  const {
    categories,
    userId,
    from,
    to,
  } = req.query;

  let visibleExpenses = expenseService.getAll();

  if (userId) {
    visibleExpenses = visibleExpenses.filter(expense => (
      expense.userId === Number(userId)
    ));
  }

  if (categories) {
    visibleExpenses = visibleExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    visibleExpenses = visibleExpenses.filter(expense => (
      expense.spentAt >= from
    ));
  }

  if (to) {
    visibleExpenses = visibleExpenses.filter(expense => (
      expense.spentAt <= to
    ));
  }

  if (from && to) {
    visibleExpenses = visibleExpenses.filter(expense => (
      expense.spentAt >= from && expense.spentAt <= to
    ));
  }

  res.send(visibleExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    category,
    spentAt,
    userId,
    amount,
    title,
    note,
  } = req.body;

  const foundUser = userService.getById(userId);

  if (!title || !foundUser || !amount || !userId) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create({
    category,
    spentAt,
    userId,
    amount,
    title,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const filteredExpenses = expenseService.getById(+id);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseService.getById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(foundExpense, { ...req.body });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
