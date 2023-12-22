'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = [];

  switch (true) {
    case !!categories && !!userId:
      filteredExpenses = expensesService.getByCategory(categories);
      break;
    case !!userId:
      filteredExpenses = expensesService.getByUser(Number(userId));
      break;
    case !!from && !!to:
      filteredExpenses = expensesService.getByPeriod(from, to);
      break;
    default:
      filteredExpenses = expensesService.getAll();
  }

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!usersService.getById(userId) || !title) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.create({
    userId, spentAt, title, amount, category, note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(Number(id));

  if (!expense) {
    res.sendStatus(404);
    res.send('Expense data not found');

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(Number(id))) {
    res.sendStatus(404);
    res.send('Expense data not found');

    return;
  }

  expensesService.deleteById(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!expensesService.getById(id) || !title) {
    res.sendStatus(404);
    res.send('Expense data not found or no title');

    return;
  }

  const updatedExpense = expensesService.update({
    id, title,
  });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  get,
  create,
  getById,
  deleteById,
  update,
};
