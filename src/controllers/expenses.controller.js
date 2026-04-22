const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || userId === null || userId === '') {
    return res.sendStatus(400);
  }

  if (!Number.isInteger(userId) || userId < 1) {
    return res.sendStatus(400);
  }

  if (!spentAt) {
    return res.sendStatus(400);
  }

  if (typeof spentAt !== 'string' || !new Date(spentAt).getTime()) {
    return res.sendStatus(400);
  }

  if (!title || typeof title !== 'string') {
    return res.sendStatus(400);
  }

  if (amount === undefined || amount === null || amount === '') {
    return res.sendStatus(400);
  }

  if (!Number.isInteger(amount) || amount < 1) {
    return res.sendStatus(400);
  }

  if (!category || typeof category !== 'string') {
    return res.sendStatus(400);
  }

  if (note !== undefined && typeof note !== 'string') {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expenseToCreate = req.body;

  const expense = await expensesService.create(expenseToCreate);

  res.status(201).json(expense);
};

const deleteOne = async (req, res) => {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.deleteById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id,
    ...req.body,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
