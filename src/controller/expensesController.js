'use strict';

const serviceExpense = require('../service/expenses.js');
const serviceUser = require('../service/users.js');

const getAllExpenses = (req, res) => {
  const query = req.query;

  if (query) {
    const expenses = serviceExpense.getByQuery(query);

    res.send(expenses);

    return;
  }

  res.send(serviceExpense.getAllExpenses());
};

const getExpenseById = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).send('Expense ID is required');

    return;
  }

  const expense = serviceExpense.getExpenseById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const expenseData = req.body;

  if (
    !expenseData.spentAt ||
    !expenseData.title ||
    expenseData.amount === undefined ||
    !expenseData.category ||
    !serviceUser.getUserById(expenseData.userId)
  ) {
    res
      .status(400)
      .send(
        'Missing required fields: spent At, title, amount, category, userId',
      );

    return;
  }

  const newExpense = serviceExpense.createExpense(expenseData);

  if (!newExpense) {
    res.status(409).send('Expense already exists');

    return;
  }

  res.status(201).send(newExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!serviceExpense.getExpenseById(+id)) {
    res.sendStatus(404);

    return;
  }

  serviceExpense.deleteExpense(+id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = req.params.id;
  const expenseData = req.body;

  if (!id) {
    res.status(400).send('Expense ID is required');

    return;
  }

  const updatedExpense = serviceExpense.updateExpense(id, expenseData);

  if (!updatedExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
