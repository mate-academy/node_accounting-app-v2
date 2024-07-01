const STATUS_CODES = require('./../utils/statusCodes');
const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.status(STATUS_CODES.ok).send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.not_found);

    return;
  }

  res.status(STATUS_CODES.ok).send(expense);
};

const create = (req, res) => {
  const expenseData = req.body;

  if (!expenseData.title || !userService.getById(expenseData.userId)) {
    res.sendStatus(STATUS_CODES.bad_request);

    return;
  }

  const newExpense = expenseService.create(expenseData);

  res.status(STATUS_CODES.created).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.not_found);

    return;
  }

  const newExpense = expenseService.update(expense, req.body);

  res.status(STATUS_CODES.ok).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(STATUS_CODES.not_found);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(STATUS_CODES.no_content);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
