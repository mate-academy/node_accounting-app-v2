'use strict';

const expensesService = require('../services/expenses.service');
const { users } = require('../services/user.service');

const expensesController = {
  get: (req, res) => {
    const { userId, categories, from, to } = req.query;

    res.send(expensesService.get(userId, categories, from, to));
  },
  getById: (req, res) => {
    const { id } = req.params;
    const expense = expensesService.getById(id);

    if (id && expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  },
  addExpense: (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const buff = {
      userId, spentAt, title, amount, category, note,
    };

    const newExpense = {};

    for (const key in buff) {
      if (!req.body[key]) {
        res.sendStatus(400);

        return;
      } else {
        newExpense[key] = buff[key];
      }
    }

    const expenseWithId = expensesService.createExpense(newExpense);

    res.statusCode = 201;
    res.send(expenseWithId);
  },
  remove: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(204);

      return;
    }

    if (!expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(id);
    res.sendStatus(204);
  },
  update: (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const updatedExpenses = expensesService.update(body, id);

    res.send(updatedExpenses);
  },
};

module.exports = expensesController;
