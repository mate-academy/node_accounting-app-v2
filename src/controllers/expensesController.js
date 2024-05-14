const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');
const statusCode = require('../utils/statusCodes');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.status(statusCode.SUCCESS).send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  res.status(statusCode.SUCCESS).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = usersService.getById(userId);

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
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(statusCode.CREATED).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  expensesService.remove(id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(statusCode.NOT_FOUND);
  }

  if (typeof title !== 'string') {
    return res.sendStatus(statusCode.BAD_REQUEST);
  }

  const updatedExpense = expensesService.update({ id, title });

  res.status(statusCode.SUCCESS).send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
