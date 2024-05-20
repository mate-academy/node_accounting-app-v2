const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
};

const validateExpense = ({ userId, spentAt, title, amount, category }) => {
  if (
    !userId ||
    typeof spentAt !== 'string' ||
    !title ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string'
  ) {
    return false;
  }

  return true;
};

const getAll = (req, res) => {
  res.statusCode = STATUS_CODES.OK;
  res.send(expensesService.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(expense);
};

const createExpenses = (req, res) => {
  const { userId } = req.body;

  const user = usersService.getByUserId(userId);

  if (!user || !validateExpense(req.body)) {
    return res.sendStatus(STATUS_CODES.BAD_REQUEST);
  }

  const newExpense = expensesService.createExpenses(req.body);

  res.statusCode = STATUS_CODES.CREATED;
  res.send(newExpense);
};

const updateExpenses = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  const updateExpense = expensesService.updateExpenses(id, body);

  res.statusCode = STATUS_CODES.OK;
  res.send(updateExpense);
};

const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  expensesService.deleteExpenses(id);

  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  createExpenses,
  updateExpenses,
  removeExpenses,
};
