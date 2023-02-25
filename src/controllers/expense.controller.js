'use strict';

const { expenseService } = require('../services/expense.service.js');

const { userService } = require('../services/user.service.js');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;

  if (userId) {
    const isUserIdValid = !isNaN(Number(userId));

    if (!isUserIdValid) {
      res.sendStatus(422);

      return;
    }
  }

  if (from && to) {
    const isFromValid = typeof from === 'string';
    const isToValid = typeof to === 'string';

    if (!isFromValid || !isToValid) {
      res.sendStatus(422);

      return;
    }
  }

  if (category) {
    const isCategoryValid = typeof category === 'string';

    if (!isCategoryValid) {
      res.sendStatus(422);

      return;
    }
  }

  const foundExpenses = expenseService.getAll(
    Number(userId),
    from,
    to,
    category,
  );

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
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

  const isDataValid = !(
    !userId
    || !spentAt
    || !title
    || !amount
    || !category
  );

  if (!isDataValid) {
    res.sendStatus(400);

    return;
  }

  const isDataTypeValid = !(
    !typeof userId === 'number'
    || !typeof spentAt === 'string'
    || !typeof title === 'string'
    || !typeof amount === 'number'
    || !typeof category === 'string'
    || !typeof note === 'string'
  );

  if (!isDataTypeValid) {
    res.sendStatus(422);

    return;
  }

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(createdExpense);
};

const getById = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const isExpenseIdValid = !isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const isExpenseIdValid = !isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
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

  const isExpenseIdValid = !isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const options = req.body;

  expenseService.update(
    expenseId,
    options,
  );

  res.send(foundExpense);
};

module.exports = {
  expenseController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
