'use strict';

const getFilteredExpenses = require('./../helpers/getFilteredExpenses');
const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const expenseController = {
  get: (req, res) => {
    res.send(getFilteredExpenses(req.query, expenseService.getAll()));
  },

  getOne: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.getById(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  },

  post: (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!spentAt
      || !title
      || !amount
      || !category
      || !note
      || !userService.getById(userId)
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.create(req.body);

    res.statusCode = 201;
    res.send(expense);
  },

  patch: (req, res) => {
    const { id } = req.params;

    const expense = expenseService.update(+id, req.body);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  },

  delete: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    if (!expenseService.getById(+id)) {
      res.sendStatus(404);

      return;
    }

    expenseService.delete(+id);
    res.sendStatus(204);
  },
};

module.exports = expenseController;
