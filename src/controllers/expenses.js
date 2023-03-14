'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const expensesController = {
  getAll: (req, res) => {
    const queryParams = req.query;

    const expenses = expensesService.getAll(queryParams);

    res.statusCode = 200;
    res.send(expenses);
  },
  getById: (req, res) => {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  },
  add: (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
    } = req.body;

    const foundUser = usersService.getById(userId);

    const isAllDataValid = foundUser
      && typeof spentAt === 'string'
      && typeof title === 'string'
      && typeof amount === 'number'
      && typeof category === 'string';

    if (!isAllDataValid) {
      res.sendStatus(400);

      return;
    }

    const expenseData = req.body;

    const newExpense = expensesService.create(expenseData);

    res.statusCode = 201;
    res.send(newExpense);
  },
  remove: (req, res) => {
    const { expenseId } = req.params;

    const expenseToRemove = expensesService.getById(expenseId);

    if (!expenseToRemove) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(expenseId);
    res.sendStatus(204);
  },
  update: (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const expense = expensesService.getById(expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    const dataToUpdate = { title };

    const updatedExpense = expensesService.update(
      expenseId,
      dataToUpdate
    );

    res.statusCode = 200;
    res.send(updatedExpense);
  },
};

module.exports = {
  expensesController,
};
