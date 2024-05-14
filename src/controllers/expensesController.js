const expensesService = require('../services/expensesService');
const STATUS_CODE = require('../utils/statusCodes');
const { validateExpenseData } = require('../utils/validateExpense');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.status(STATUS_CODE.SUCCESS).send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  res.status(STATUS_CODE.SUCCESS).send(expense);
};

const create = (req, res) => {
  if (!validateExpenseData(req.body)) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const newExpense = expensesService.create(req.body);

  res.status(STATUS_CODE.CREATED).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  expensesService.remove(id);
  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(STATUS_CODE.NOT_FOUND);
  }

  if (typeof title !== 'string') {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }

  const updatedExpense = expensesService.update({ id, title });

  res.status(STATUS_CODE.SUCCESS).send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
