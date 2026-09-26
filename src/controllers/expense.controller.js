/* eslint-disable no-console */
'use strict';

const { expensesService } = require('../services/expense.service');
const { usersService } = require('../services/user.service');

const getAll = async (req, res) => {
  const result = expensesService.getAll(req.query);

  res.status(200).json(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const oneExpense = await expensesService.getById(id);

  if (!oneExpense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  res.send(oneExpense);
};

const create = async (req, res) => {
  const expense = req.body;
  const { userId, spentAt, title, amount } = expense;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  const newExpense = await expensesService.createExpense(expense);

  res.status(201).json(newExpense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  const updatedExpense = expensesService.update(id, body);

  res.status(200).json(updatedExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  await expensesService.deleteById(id);

  res.status(204).send();
};

const expensesController = {
  getAll,
  getOne,
  create,
  update,
  removeExpense,
};

module.exports = {
  expensesController,
};
