'use strict';

const expenseService = require('../services/expenses.service');
const userService = require('../services/user.service');

function filterRequestBody(body, allowedFields) {
  const result = {};

  for (const field of allowedFields) {
    if (body[field]) {
      result[field] = body[field];
    }
  }

  return result;
}

const getAllExpenses = (req, res) => {
  const expenses = expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const createNewExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.findUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createNewExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const filteredBody = filterRequestBody(
    req.body, ['spentAt', 'title', 'amount', 'category', 'note']
  );

  if ((filteredBody.hasOwnProperty('title')
            && typeof filteredBody.title !== 'string')
        || (filteredBody.hasOwnProperty('spentAt')
            && typeof filteredBody.spentAt !== 'string')
        || (filteredBody.hasOwnProperty('amount')
            && typeof filteredBody.amount !== 'number')
        || (filteredBody.hasOwnProperty('category')
            && typeof filteredBody.category !== 'string')
        || (filteredBody.hasOwnProperty('note')
            && typeof filteredBody.note !== 'string')
  ) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expenseService.updateExpense({
    id: foundExpense.id,
    body: filteredBody,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  deleteExpense,
  updateExpense,
};
