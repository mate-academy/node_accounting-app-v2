'use strict';

const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const getAll = (req, res) => {
  const userId = Number(req.query.userId);
  const {
    from,
    to,
    categories,
  } = req.query;

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === userId);
  }

  if (from) {
    expenses = expenses.filter(({ spentAt }) => spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter(({ spentAt }) => spentAt <= to);
  }

  if (categories) {
    expenses = expenses.filter(expense =>
      categories.includes(expense.category)
    );
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const user = expensesService.getById(Number(req.params.id));

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const userId = Number(req.body.userId);
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || !usersService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const expenseId = Number(new Date());
  const newExpense = expensesService.create(
    expenseId,
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

const update = (req, res) => {
  const id = Number(req.params.id);

  if (!id || !expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(id, req.body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
