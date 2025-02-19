const expensesServ = require('../services/expenses.service');
const usersServ = require('../services/users.service');
const statusCode = require('../utils/statusCode');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const id = Number(userId);

  res.send(expensesServ.allExpenses(id, categories, from, to));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.OK).send(expense);
};

const getCreateExpense = (req, res) => {
  const body = req.body;
  const user = usersServ.userById(body.userId);

  if (!user) {
    res.sendStatus(statusCode.BAD_REQUEST);
  }

  res.statusCode = statusCode.CREATED;
  res.send(expensesServ.createExpenses(body));
};

const getDeleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  expensesServ.deleteExpenses(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const getUpdateExpense = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesServ.expenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  expensesServ.updateExpenses(id, body);
  res.status(statusCode.OK).send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  getCreateExpense,
  getDeleteExpense,
  getUpdateExpense,
};
