'use strict';

const expensesService = require('../services/expenses.services.js');
const { getUserById } = require('../services/users.services.js');

const getAllExpenses = (req, res) => {
  res.status(200).send(expensesService.getAllExpenses(req.query));
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!getUserById(userId)) {
    return res.status(400).json({ message: 'User not found' });
  }

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

  if (!currentExpense) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(200).send(currentExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const isRemoved = expensesService.removeExpenseById(+id);

  if (!isRemoved) {
    res.status(404).send({ message: 'Expense Not found' });

    return;
  }

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const isExpense = expensesService.findExpenseById(+id);

  if (!isExpense) {
    res.status(404).send({ message: 'Expense Not found' });

    return;
  }

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
