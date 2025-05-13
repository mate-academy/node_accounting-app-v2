/* eslint-disable no-console */
const { expensesService } = require('../services/expense.service');
const { usersService } = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let result = expensesService.getAll();

  if (userId) {
    result = result.filter((item) => item.userId === +userId);
  }

  if (categories) {
    result = result.filter((item) => item.category === categories);
  }

  if (from) {
    result = result.filter((item) => new Date(item.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((item) => new Date(item.spentAt) <= new Date(to));
  }

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

  if (!expense.title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!expense.userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const user = await usersService.getById(expense.userId);

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

  res.send(expensesService.update({ id, body }));
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
