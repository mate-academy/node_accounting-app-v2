'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = expenseService.getAll();

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(({ category }) => categories.includes(category));
  }

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    const valueFrom = new Date(from).valueOf();
    const valueTo = new Date(to).valueOf();

    filteredExpenses = filteredExpenses
      .filter(({ spentAt }) => {
        const valueSpentAt = new Date(spentAt).valueOf();

        return (valueSpentAt >= valueFrom && valueSpentAt <= valueTo);
      });
  }

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

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
  const foundUser = userService.findById(userId);

  if (
    !userId
      || !spentAt
      || !title
      || !amount
      || !category
      || !note
      || !foundUser
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

const change = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

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

  expenseService.update({
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
  change,
};
