/* eslint-disable curly */
'use strict';

const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query || {});

  res.json(expenses);
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) return res.sendStatus(404);

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) return res.sendStatus(400);

  const expense = await expensesService.create({ userId, ...req.body });

  res.status(201).json(expense);
};

const updatePut = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) return res.sendStatus(404);

  const { userId, spentAt, title, amount, category, note } = req.body || {};

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.update({
    id: req.params.id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

const updatePatch = async (req, res) => {
  const body = req.body || {};
  const filteredBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => Boolean(value)),
  );

  const expense = await expensesService.getById(req.params.id);

  if (!expense) return res.sendStatus(404);

  const updatedExpense = await expensesService.update({
    ...expense,
    ...filteredBody,
    id: req.params.id,
  });

  res.json(updatedExpense);
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) return res.sendStatus(404);

  await expensesService.deleteById(req.params.id);

  res.sendStatus(204);
};

module.exports = {
  expensesController: {
    getAll,
    getOne,
    create,
    deleteOne,
    updatePut,
    updatePatch,
  },
};
