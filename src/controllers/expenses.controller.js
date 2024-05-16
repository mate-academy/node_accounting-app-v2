const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (!userId && !categories && !from && !to) {
    const allExpenses = expensesService.getAllExpenses();

    return res.status(200).send(allExpenses);
  }

  const expenses = expensesService.getAllExpenses(userId, categories, from, to);

  res.status(200).send(expenses);
};

const createExpense = (req, res) => {
  const body = req.body;

  const { userId, spentAt, title, amount, category, note } = body;

  if ((!userId || !spentAt || !title || !amount || !category, !note)) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.createNewExpense(body);

  const user = usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  res.status(201).send(newExpense);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesService.removeExpenseById(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesService.updateExpenseById(id, data);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAll,
  createExpense,
  getById,
  removeExpense,
  updateExpense,
};
