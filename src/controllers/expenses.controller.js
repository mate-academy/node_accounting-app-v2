'use strict';

const {
  getExpenses,
  getExpensesById,
  creatEexpenses,
  updatEexpenses,
  deletEexpenses,
} = require('../services/expenses.service');
const { hasRequiredNonEmptyFields } = require('../services/helpers');

const REQUIRED_EXPENSE_FIELDS = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

function listExpenses(req, res) {
  const expenses = getExpenses(req.query);

  if (expenses === null) {
    return res.status(404).end();
  }

  res.json(expenses);
}

function getExpense(req, res) {
  const expense = getExpensesById(req.params.id);

  if (!expense) {
    return res.status(404).end();
  }

  res.json(expense);
}

function createExpense(req, res) {
  const body = req.body ?? {};

  if (!hasRequiredNonEmptyFields(body, REQUIRED_EXPENSE_FIELDS)) {
    return res.status(400).end();
  }

  const expense = creatEexpenses({ ...body });

  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(400).end();
  }
}

function handleUpdate(req, res) {
  const expense = updatEexpenses(req.params.id, req.body ?? {});

  if (!expense) {
    return res.status(404).end();
  }

  res.json(expense);
}

function deleteExpense(req, res) {
  const deleted = deletEexpenses(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }

  res.status(204).end();
}

module.exports = {
  listExpenses,
  getExpense,
  createExpense,
  handleUpdate,
  deleteExpense,
};
