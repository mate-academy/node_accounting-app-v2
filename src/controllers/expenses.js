'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const expenses = expenseService.getAll();

  if (userId) {
    let filteredExpenses
      = expenses.filter(expense => expense.userId === +userId);

    if (category) {
      filteredExpenses
          = expenses
          .filter(expense => expense.category === category);

      res.send(filteredExpenses);

      return;
    }

    res.send(filteredExpenses);

    return;
  }

  if (from && to) {
    const filteredExpenses
      = expenses
        .filter(expense => expense.spentAt >= from && expense.spentAt <= to);

    res.send(filteredExpenses);

    return;
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = userService.getById(userId);

  if (!title || !foundUser) {
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
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt = foundExpense.spentAt,
    title = foundExpense.title,
    amount = foundExpense.amount,
    category = foundExpense.category,
    note = foundExpense.note,
  } = req.body;

  expenseService.update({
    id: +expenseId,
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
  add,
  remove,
  update,
};
