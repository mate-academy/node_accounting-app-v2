'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getfiltered = (req, res) => {
  const { userId, from, to, categories } = req.query;
  const filteredExpenses = expensesService.getFiltered({
    userId,
    from,
    to,
    categories,
  });

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const remove = (req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const create = (req, res) => {
  const { title, userId } = req.body;

  const user = usersService.getById(userId);

  if (!title || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const expenseId = +req.params.expenseId;
  const data = req.body;

  const expense = expensesService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(data, expenseId);

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getfiltered,
  getById,
  remove,
  create,
  update,
};
