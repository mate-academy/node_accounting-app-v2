const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.status(200).send(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const { userId, title } = req.body;

  if (!userService.getById(userId) || !title) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.create(req.body);

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesService.update(id, req.body);

  res.status(200).send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesService.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
