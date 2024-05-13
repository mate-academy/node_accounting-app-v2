const expensesService = require('../services/expenses.service');
const { getUser } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getExpenses(query);

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpense(Number(id));

  if (!expense) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expense);
};

const createNewExpense = (req, res) => {
  const body = req.body;
  const user = getUser(body.userId);

  if (!user) {
    res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(expensesService.createExpense(body));
};

const updateExpenseById = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = expensesService.getExpense(Number(id));

  if (!expense) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expensesService.updateExpense(expense.id, body));
};

const deleteExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpense(Number(id));

  if (!expense) {
    res.sendStatus(404);
  }

  expensesService.deleteExpense(expense.id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  updateExpenseById,
  deleteExpenseById,
};
