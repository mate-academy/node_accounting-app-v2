const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');
const { statusCodes } = require('../constants/statusode');
const validateExpense = require('../utils/getValidateExtense');

const getAll = (req, res) => {
  res.statusCode = statusCodes.ok;
  res.send(expensesService.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  res.statusCode = statusCodes.ok;
  res.send(expense);
};

const createExpenses = (req, res) => {
  const { userId } = req.body;

  const user = usersService.getByUserId(userId);

  if (!user || !validateExpense(req.body)) {
    return res.sendStatus(statusCodes.bad_request);
  }

  const newExpense = expensesService.createExpenses(req.body);

  res.statusCode = statusCodes.created;
  res.send(newExpense);
};

const updateExpenses = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  const updateExpense = expensesService.updateExpenses(id, body);

  res.statusCode = statusCodes.ok;
  res.send(updateExpense);
};

const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(statusCodes.not_found);

    return;
  }

  expensesService.deleteExpenses(id);

  res.sendStatus(statusCodes.no_content);
};

module.exports = {
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  removeExpenses,
};
