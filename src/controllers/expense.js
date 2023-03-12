'use strict';

const { expenseService } = require('../services/expense.js');
const { userService } = require('../services/user.js');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    category,
  } = req.query;

  if (userId) {
    const invalidUserId = !isNaN(Number(userId));

    if (!invalidUserId) {
      res.sendStatus(422);

      return;
    }
  }

  if (category) {
    const validCategory = typeof category === 'string'
    || Array.isArray(category);

    if (!validCategory) {
      res.sendStatus(422);

      return;
    }
  }

  const filteredExpenses = expenseService.getAll(
    Number(userId),
    from,
    to,
    category,
  );

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const validExpense = !isNaN(expenseId);

  if (!validExpense) {
    res.sendStatus(400);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addNew = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const validData = userId && spentAt && title && amount && category && note;

  if (!validData) {
    res.sendStatus(400);

    return;
  }

  const validDataType = !(
    !typeof userId === 'number'
    || !typeof spentAt === 'string'
    || !typeof title === 'string'
    || !typeof amount === 'number'
    || !typeof category === 'string'
    || !typeof note === 'string'
  );

  if (!validDataType) {
    res.sendStatus(422);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addNew({
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

const remove = (res, req) => {
  const expenseId = Number(req.params.expenseId);

  const validIdExpense = !isNaN(expenseId);

  if (!validIdExpense) {
    res.sendStatus(422);

    return;
  }

  const expenseToDelete = expenseService.getById(expenseId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const validIdExpense = !isNaN(expenseId);

  if (!validIdExpense) {
    res.sendStatus(422);

    return;
  }

  const expenseToUpdate = expenseService.getById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const options = req.body;

  if (!options) {
    res.sendStatus(422);

    return;
  }

  expenseService.update(expenseId, options);

  res.send(expenseToUpdate);
};

module.exports = {
  expenseController: {
    getAll,
    getOne,
    addNew,
    remove,
    update,
  },
};
