/* eslint-disable function-paren-newline */
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = expenseService.get();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === +userId,
    );
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category),
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const newExpenseBody = req.body;
  const requiredProperties = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
  ];

  if (
    !requiredProperties.every((prop) => prop in newExpenseBody) ||
    !userService.getById(newExpenseBody.userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(newExpenseBody);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedExpenseBody = req.body;

  if (!id || !updatedExpenseBody) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update(+id, updatedExpenseBody);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
