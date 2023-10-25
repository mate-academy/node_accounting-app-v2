'use strict';

const { expenseServices } = require('../services/expensesServices');
const { userServices } = require('../services/userServices');

function getExpenses(req, res) {
  let currentExpenses = expenseServices.getExpenses();
  const userId = Number(req.query.userId);
  let from = req.query.from;
  let to = req.query.to;
  const category = req.query.categories;

  // eslint-disable-next-line no-console

  if (userId) {
    currentExpenses
      = currentExpenses.filter(expense => expense.userId === userId);
  }

  if (from && to) {
    from = new Date(from);
    to = new Date(to);

    currentExpenses
      = currentExpenses.filter(expense => {
        return new Date(expense.spentAt) >= from
        && new Date(expense.spentAt) <= to;
      });
  }

  if (category) {
    currentExpenses
      = currentExpenses.filter(expense => expense.category === category);
  }

  res.send(currentExpenses);
}

function getExpenseById(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const expenseResult = expenseServices.getExpense(searchId);

  if (!expenseResult) {
    res.sendStatus(404);

    return;
  }
  res.send(expenseResult);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const userIds = userServices.getAllIds();

  if (!userIds.includes(userId)) {
    res.sendStatus(400);

    return;
  }

  let id = expenseServices.getId();

  if (id === -Infinity) {
    id = 0;
  }

  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenseServices.createExpense(expense);
  res.statusCode = 201;
  res.send(expense);
}

function updateExpense(req, res) {
  const { id } = req.params;
  const searchId = +id;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const index = expenseServices.expenseIndex(searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  // eslint-disable-next-line no-console
  console.log(typeof userId, typeof spentAt,
    typeof title,
    typeof amount,
    typeof category);

  if ((userId && typeof userId !== 'number')
    || (spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')) {
    res.sendStatus(422);

    return;
  }

  res.send(expenseServices.updateExpense(index,
    userId, spentAt, title, amount, category, note));
}

function deleteExpense(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const index = expenseServices.expenseIndex(searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(index);
  res.sendStatus(204);
}

module.exports = {
  deleteExpense,
  updateExpense,
  createExpense,
  getExpenseById,
  getExpenses,
};
