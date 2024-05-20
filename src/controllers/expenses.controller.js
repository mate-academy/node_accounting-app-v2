const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');
const { HTTP_STATUS } = require('../consts');

const getAll = async (req, res) => {
  res.send(expensesService.getAll(req.query));
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, title, amount, category, spentAt } = req.body;

  if (
    !userId ||
    !title ||
    !amount ||
    !category ||
    !spentAt ||
    !usersService.getById(userId)
  ) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

    return;
  }

  res.statusCode = HTTP_STATUS.CREATED;

  res.send(expensesService.create(req.body));
};

const update = async (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.statusCode = HTTP_STATUS.OK;

  res.send(expensesService.update(id, req.body));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.statusCode = HTTP_STATUS.NO_CONTENT;
  res.send(expensesService.remove(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
