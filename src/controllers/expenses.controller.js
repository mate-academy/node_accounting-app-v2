'use strict';

const expensesService = require('../services/expenses.service');
const { isValidDate } = require('../middleware/middleware');

const getAllExpenses = (req, res) => {
  try {
    const expenses = expensesService.getAll(req.query);

    res.json(expenses);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOneExpense = (req, res) => {
  try {
    const { id } = req.params;

    const expense = expensesService.getById(+id);

    if (!expense) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }
    res.json(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const createExpense = (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (isValidDate(req.body)) {
      res.statusCode = 400;
      res.statusMessage = 'Error';
      res.end();
    }

    const newExpense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.json(newExpense);
    res.end();
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateExpense = (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const expense = expensesService.getById(+id);

    if (!expense) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    const updatedExpense = expensesService.update(id, data);

    res.json(updatedExpense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeExpense = (req, res) => {
  try {
    const { id } = req.params;

    const expense = expensesService.getById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expensesService.remove(+id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
