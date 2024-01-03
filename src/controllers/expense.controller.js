'use strict';

const { expenseService } = require('../services/expense.service.js');
const { userService } = require('../services/user.service.js');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expenseService.getAll({
    userId,
    categories,
    from,
    to,
  }));
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

  const user = userService.getById(+userId);

  if (!user || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
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

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update({
    id: +id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  expenseController: {
    getAll,
    create,
    getOne,
    remove,
    update,
  },
};
