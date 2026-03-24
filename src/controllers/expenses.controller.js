/* eslint-disable */

const expensesService = require('../services/expenses.service.js');
const userService = require('../services/user.service.js');

function get(req, res) {
  const { userId, categories, from, to } = req.query;

  res.json(expensesService.getAll({ userId, categories, from, to }));
}

function getOne(req, res) {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);
    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
}

function update(req, res) {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update({ id, ...req.body });

  res.json(updatedExpense);
}

function remove(req, res) {
  const { id } = req.params;
  const expenseId = Number(id);

  if (!expensesService.getById(expenseId)) {
    return res.sendStatus(404);
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
