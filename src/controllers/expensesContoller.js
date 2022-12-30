'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = (req, res, next) => {
  const expenses = expensesService.getAll();

  if (Object.keys(req.query).length === 0) {
    res.send(expenses);

    return;
  }

  next();
};

const getAllWithQuery = (req, res) => {
  const { userId, category, from, to } = req.query;

  const expensesToShow = expensesService
    .getAllWithQuery(userId, category, from, to);

  res.send(expensesToShow);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addOne = (req, res) => {
  const { userId } = req.body;
  const foundUser = usersService.getOne(userId);

  if (!foundUser || Object.keys(req.body) < 6) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addOne(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(expenseId);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (Object.keys(req.body).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.updateOne(expenseId, req.body);

  res.send(updatedExpense);
};

module.exports.expensesController = {
  getAll,
  getAllWithQuery,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
