'use strict';

const { expensesService } = require('../services/expensesService');
const { userService } = require('../services/userService');

const expensesController = {
  getAll: async(req, res) => {
    const { userId, categories, from, to } = req.query;

    const expenses = await expensesService
      .getAll(Number(userId), categories, from, to);

    res.send(expenses);
  },

  getByOne: async(req, res) => {
    const { expenseId } = req.params;

    const expense = await expensesService.getById(Number(expenseId));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  },

  create: async(req, res) => {
    const newExpense = req.body;

    if (!newExpense.title) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.getById(Number(newExpense.userId));

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const createdExpense = await expensesService.create(newExpense);

    res.statusCode = 201;
    res.send(createdExpense);
  },

  remove: async(req, res) => {
    const { expenseId } = req.params;

    const expense = await expensesService.getById(Number(expenseId));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expensesService.remove(Number(expenseId));
    res.sendStatus(204);
  },

  update: async(req, res) => {
    const { expenseId } = req.params;
    const newExpense = req.body;

    const expense = await expensesService.getById(Number(expenseId));

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = await expensesService.update(expense.id, newExpense);

    res.send(updatedExpense);
  },
};

module.exports = { expensesController };
