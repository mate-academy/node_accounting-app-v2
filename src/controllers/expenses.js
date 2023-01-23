'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllExpenses = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = expensesService.getAllExpenses(userId, category, from, to);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addNewExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addNewExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.json(newExpense);
};

const deleteExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expensesService.deleteExpenseById(Number(expenseId));
  res.sendStatus(204);
};

const updateExpenseById = (req, res) => {
  const { title } = req.body;
  const { expenseId } = req.params;

  const expenseToUpdate = expensesService.getExpenseById(Number(expenseId));

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.updateExpenseById(
    Number(expenseId),
    { title }
  );

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  deleteExpenseById,
  updateExpenseById,
};
