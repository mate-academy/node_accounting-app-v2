'use strict';

const { ExpenseService } = require('../services/expenses.service');
const { UserService } = require('../services/users.service');

const getAll = (req, res) => {
  let expenses = ExpenseService.getAll();
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    const date = new Date(from);

    expenses = expenses
      .filter(expense => new Date(expense.spentAt) >= date);
  }

  if (to) {
    const date = new Date(to);

    expenses = expenses
      .filter(expense => new Date(expense.spentAt) <= date);
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const expense = ExpenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const user = UserService.getById(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = ExpenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!ExpenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  ExpenseService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!ExpenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  if (!userId && !spentAt && !title && !amount && !category && !note) {
    res.sendStatus(400);

    return;
  }

  const expense = ExpenseService.update(+id, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 200;
  res.send(expense);
};

const ExpensesController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  ExpensesController,
};
