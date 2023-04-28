'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');
const { isDateValid } = require('../functions/validateDate');

const getAll = (req, res, _next) => {
  if (Object.keys(req.query).length === 0) {
    const expenses = expenseService.getAll();

    res.send(expenses);

    return;
  }

  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId && !categories && !from && !to) {
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
  }

  let categoriesArray = categories;

  if (categoriesArray) {
    categoriesArray = Array.isArray(categories)
      ? categories
      : [ categories ];
  }

  const foundExpenses = expenseService
    .getByParameters(userId, categoriesArray, from, to);

  res.send(foundExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.send(foundExpense);
  }
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  };

  if (
    typeof userId !== 'number'
    || !isDateValid(spentAt)
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create({
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

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    amount,
  } = req.body;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  let isValid = true;

  for (const key in req.body) {
    switch (key) {
      case 'spentAt':
        isValid = isDateValid(spentAt);
        break;
      case 'amount':
        isValid = typeof amount === 'number';
        break;
      case 'title':
      case 'category':
      case 'note':
        isValid = typeof req.body[key] === 'string';
        break;
      default:
        res.sendStatus(422);

        return;
    }
  }

  if (!isValid) {
    res.sendStatus(400);

    return;
  }

  expenseService.update(foundExpense, { ...req.body });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
