const expensesService = require('../services/expenses.service.js');
const { getUserById } = require('../services/user.service');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const foundedExpense = expensesService.getExpenseById(id);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const foundedExpense = expensesService.getExpenseById(id);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const foundedExpense = expensesService.getExpenseById(id);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, data);

  res.send(updatedExpense);
};
const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesService.createExpenses(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpenses);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  removeExpense,
  updateExpense,
  createExpense,
};
