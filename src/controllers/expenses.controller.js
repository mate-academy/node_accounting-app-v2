'use strict';

const expensesService = require('../services/expenses.services.js');
const { getUserById } = require('../services/users.services.js');

const getAllExpenses = (req, res) => {
  res.status(200).send(expensesService.getAllExpenses(req.query));
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  // Check is user exist, if no, throw Error
  getUserById(userId, true);

  const newExpense = expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const currentExpense = expensesService.getExpenseById(+id);

  res.status(200).send(currentExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  expensesService.removeExpenseById(+id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  // Check is expense exist, if no, throw Error
  expensesService.findExpenseById(+id);

  const updatedExpense = expensesService.updateExpenseById(+id, req.body);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
};
