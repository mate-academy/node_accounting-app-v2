const expenseService = require('../services/expense.service');
const STATUS_CODES = require('../constant/statusCode');
const { validateExpense } = require('../function/validation');

const getAll = (req, res) => {
  res.statusCode = STATUS_CODES.successful;
  res.send(expenseService.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  res.statusCode = STATUS_CODES.successful;
  res.send(expense);
};

const postExpense = async (req, res) => {
  const validation = validateExpense(req.body);

  if (!validation.isValid) {
    return res.sendStatus(validation.statusCode);
  }

  const expense = await expenseService.create(req.body);

  res.status(STATUS_CODES.created).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  expenseService.remove(id);

  return res.sendStatus(STATUS_CODES.noContent);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODES.notFound);
  }

  res.statusCode = STATUS_CODES.successful;
  res.send(expenseService.update(id, req.body));
};

module.exports = {
  getAll,
  getById,
  postExpense,
  deleteExpense,
  updateExpense,
};
