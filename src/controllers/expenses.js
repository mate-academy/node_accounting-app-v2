'use strict';

const { filterExpanses } = require('../utils/filterExpanses.js');
const { createId } = require('../utils/createId.js');

const { userModel } = require('../controllers/users.js');
const { ExpensesModel } = require('../models/expenses.js');

const expensesModel = new ExpensesModel(createId, filterExpanses);

const getExpenses = (req, res) => {
  const filtredEcpenses = expensesModel.getExpenses(req.query);

  res.send(filtredEcpenses);
};

const getExpenseById = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesModel.getExpenseById(Number(expensesId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId } = req.body;

  const bodyProps = Object.values(req.body);
  const isRequireValid = bodyProps.every((prop) => prop);

  const foundUser = userModel.getUserById(userId);

  if (!isRequireValid || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesModel.createExpense(req.body);

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesModel.getExpenseById(Number(expensesId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesModel.removeExpense(Number(expensesId));
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesModel.getExpenseById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesModel.updateExpense({
    expensesId,
    data: req.body,
  });

  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
  expensesModel,
};
