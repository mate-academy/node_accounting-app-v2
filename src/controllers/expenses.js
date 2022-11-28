'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const query = req.query;

  if (query.userId) {
    const filteredByUser = expensesService.getExpensesByUser(query.userId);

    res.send(filteredByUser);

    return;
  }

  if (query.from && query.to) {
    const filteredByDate = expensesService.getExpensesByDate(
      query.from,
      query.to
    );

    res.send(filteredByDate);

    return;
  }

  if (query.category) {
    const filteredByCategory = expensesService.getExpensesByCategory(
      query.category
    );

    res.send(filteredByCategory);

    return;
  }

  if (!query.userId && !query.from && !query.to && !query.category) {
    const expenses = expensesService.getExpenses();

    res.send(expenses);
  }
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense(
    expenseId,
    req.body,
  );

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
