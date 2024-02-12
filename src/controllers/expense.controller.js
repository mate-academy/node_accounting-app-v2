'use strict';

const expenseService = require('../service/expense.service');
const userService = require('../service/user.service');
const {
  validateExpenseGetRequestQuery,
  validateExpensePatchRequestBody,
  validateExpensePostRequestBody,
} = require('../utils/validateRequest');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const isQueryValid = validateExpenseGetRequestQuery({
    userId, categories, from, to,
  });

  if (!isQueryValid) {
    res.sendStatus(400);

    return;
  }

  const expenses = expenseService.get({
    userId: parseInt(userId),
    categories,
    from,
    to,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addOne = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isRequestValid = validateExpensePostRequestBody({
    userId, spentAt, title, amount, category, note,
  });

  if (!isRequestValid || !userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = expenseService.add(newExpenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const id = parseInt(req.params.id);
  const { spentAt, title, amount, category, note } = req.body;

  const isRequestValid = validateExpensePatchRequestBody({
    spentAt, title, amount, category, note,
  });

  if (isNaN(id) || !isRequestValid) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const dataToUpdate = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const updatedExpense = expenseService.update(id, dataToUpdate);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
