const expensesService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const query = req.query;

  const expenses = expensesService.getAllExpenses(query);

  res.send(expenses);
};

const getExpenceById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(expense);
};

const createNewExpense = (req, res) => {
  const body = req.body;
  const user = getUserById(body.userId);

  if (!user) {
    res.sendStatus(400);
  }

  const expense = expensesService.createExpence(body);

  res.statusCode = 201;

  res.send(expense);
};

const removeExpence = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  expensesService.deleteExpense(id);
  res.sendStatus(204);
};

const updateExpenceById = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = expensesService.getExpenseById(Number(id));

  if (!expense) {
    res.sendStatus(404);
  }

  const updatedExpense = expensesService.updateExpence(id, body);

  res.statusCode = 200;

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenceById,
  createNewExpense,
  removeExpence,
  updateExpenceById,
};
