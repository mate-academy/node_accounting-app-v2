'use strict';

const expensesService = require('../services/expensesServices');
const usersService = require('../services/usersServices');

beforeEach(() => {
  expensesService.deleteAllExpenses();
});

const getExpenses = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = expensesService.getExpenses();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses.filter(
      expense => new Date(expense.spentAt) > new Date(from)
    );
  }

  if (to) {
    expenses = expenses.filter(
      expense => new Date(expense.spentAt) < new Date(to)
    );
  }

  if (categories) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = usersService.getUser(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpense(+id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(+id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(expense, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
