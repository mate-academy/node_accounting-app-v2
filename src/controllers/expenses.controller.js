'use strict';

const usersService = require('../services/users.service.js');
const expensesService = require('../services/expenses.service.js');

const getFilteredExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expensesService.getFiltered(
    Number(userId),
    from,
    to,
    categories
  );

  res.status(200).send(filteredExpenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.status(200).send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('All input fields are required');

    return;
  }

  if (
    typeof userId !== 'number'
    || isNaN(Date.parse(spentAt))
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  const foundUser = usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(400).send(`Unable to add an expense to userId ${userId}`);

    return;
  }

  const newExpense = expensesService.create({
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send(`Unable to delete expense with id ${expenseId}`);

    return;
  }

  expensesService.remove(Number(expenseId));
  res.status(204).send(`Expense with id ${expenseId} deleted successfully`);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send(`Unable to update expense with id: ${expenseId}`);

    return;
  }

  const updatedExpense = expensesService.update(Number(expenseId), req.body);

  if (
    isNaN(Date.parse(spentAt))
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || Object.keys(req.body).length > 5
    || Object.keys(req.body).length === 0
  ) {
    res.status(422).send('Incorrect Data Format');

    return;
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
