const userService = require('../services/user.service');
const expenseService = require('../services/expense.service');

const create = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!userService.getById(userId)) {
    return res.sendStatus(400);
  }

  if (!spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(expenseService.create(req.body));
};

const getAll = (req, res) => {
  res.send(expenseService.getAll(req.query));
};

const get = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expenseService.update(id, req.body));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  get,
  update,
  remove,
};
