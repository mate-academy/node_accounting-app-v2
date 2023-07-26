'use strict';

const expenseServices = require('./expensesServices');

const getAll = (req, res) => {
  const expenses = expenseServices.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const createExpense = (req, res) => {
  const isValidRequest = expenseServices.validateData(req.body);

  if (!isValidRequest) {
    res.status(400).send({ message: 'Request is not valid' });

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.status(201).send(newExpense);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServices.getExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const existingExpense = expenseServices.getExpenseById(Number(expenseId));

  if (!existingExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.removeExpense(Number(expenseId));

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;

  const existingExpense = expenseServices.getExpenseById(Number(expenseId));

  if (!existingExpense) {
    res
      .status(404)
      .send({ message: 'Expense not found' });

    return;
  }

  const updatedExpense
  = expenseServices.updateExpense(Number(expenseId), expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  createExpense,
  getOneExpense,
  removeExpense,
  updateExpense,
};
