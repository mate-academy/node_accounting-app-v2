/* eslint-disable no-console */
const expenseServices = require('../services/expenseServices.js');
const userServices = require('../services/userServices.js');

const listAllExpenses = (req, res) => {
  try {
    const filteredExpenses = expenseServices.getAllExpenses(req.query);

    res.status(200).send(filteredExpenses);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.sendStatus(404);
  }

  try {
    const expense = expenseServices.getExpenseById(Number(id));

    res.status(expense ? 200 : 404).json(expense);
  } catch {
    res.sendStatus(500);
  }
};

const createExpense = (req, res) => {
  const { userId } = req.body;

  const user = userServices.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  try {
    const newExpense = expenseServices.createExpense(req.body);

    res.status(201).send(newExpense);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  try {
    const expenseToRemove = expenseServices.deleteExpenseById(Number(id));

    if (!expenseToRemove) {
      return res.sendStatus(404);
    }

    res.status(204).send();
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const updateExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const expenseToUpdate = expenseServices.updateExpenseById({
      ...req.body,
      id: Number(id),
    });

    res.status(expenseToUpdate ? 200 : 404).send(expenseToUpdate);
  } catch {
    res.sendStatus(500);
  }
};

module.exports = {
  listAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpenseById,
};
