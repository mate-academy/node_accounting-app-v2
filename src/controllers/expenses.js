'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = expenseService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) =>
      categories.includes(expense.category),
    );
  }

  if (from && to) {
    expenses = expenses.filter((expense) => {
      const normalizedExpenseDate = new Date(expense.spentAt);
      const normalizedDateFrom = new Date(from);
      const normalizedDateTo = new Date(to);

      return (
        normalizedExpenseDate >= normalizedDateFrom
        && normalizedExpenseDate <= normalizedDateTo
      );
    });
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const add = (req, res) => {
  const { spentAt, title, amount, category, note, userId } = req.body;

  if (!spentAt || !title || !amount || !category || !note || !userId) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    user.id,
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
  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const expenseData = req.body;

  expenseService.update(expenseId, expenseData);
  res.send(foundedExpense);
};

const expenseController = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = expenseController;
