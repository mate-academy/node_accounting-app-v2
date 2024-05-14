const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const getAll = (req, res) => {
  res.statusCode = 200;
  res.send(expensesService.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const createExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  const user = usersService.getByUserId(userId);

  if (
    !user ||
    !spentAt ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string'
  ) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.createExpenses(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpenses = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updateExpense = expensesService.updateExpenses(id, body);

  res.statusCode = 200;
  res.send(updateExpense);
};

const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpenses(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  removeExpenses,
};
