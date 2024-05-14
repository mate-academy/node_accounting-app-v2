const expensesService = require('../services/expenses.service');
const { getById } = require('../services/users.service');
const HTTP_STATUS_CODES = require('../variables/httpStatusCodes');

const getAll = (req, res) => {
  const { query } = req;
  const expenses = expensesService.getAll(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = getById(userId);

  if (!user || !spentAt || !title || !amount || !category) {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = HTTP_STATUS_CODES.CREATED;
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.update(id, body);

  res.statusCode = HTTP_STATUS_CODES.OK;

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
