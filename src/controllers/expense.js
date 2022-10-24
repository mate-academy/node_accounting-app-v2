'use strict';

const { expenseService } = require('../service/expense.js');
const { userService } = require('../service/user.js');

const add = (req, res) => {
  let nextExpenseId = 1;

  const {
    userId,
    title,
  } = req.body;

  if (!userService.getById(userId) || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    ...req.body,
    id: nextExpenseId++,
  };

  expenseService.add(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getAll = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = expenseService.getAll();

  if (typeof +userId !== 'number') {
    res.sendStatus(400);

    return;
  };

  if (userService.getById(+userId)) {
    const userExpenses = expenseService.findUserExpenses(userId, category);

    res.send(userExpenses);

    return;
  }

  if (from && to) {
    const expensesBetweenDate = expenseService.filteredFromTo(from, to);

    res.send(expensesBetweenDate);

    return;
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const expenseId = +req.params.expenseId;

  if (typeof expenseId !== 'number') {
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

const update = (req, res) => {
  const { title } = req.body;
  const expenseId = +req.params.expenseId;

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expenseService.update(title, foundExpense);

  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = +req.params.expenseId;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+expenseId);

  res.sendStatus(204);
};

module.exports.expenseController = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
