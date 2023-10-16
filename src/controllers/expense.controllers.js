'use strict';

const expenseServices = require('../services/expense.service');
const userServices = require('../services/user.service');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = expenseServices.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expenseServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (!id) {
    res.sendStatus(400);

    return;
  }

  res.send(expense);
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

  if (!userServices.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenseServices.add(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseServices.update(id, req.body));
};

module.exports = {
  getAll,
  getOne,
  update,
  remove,
  create,
};
