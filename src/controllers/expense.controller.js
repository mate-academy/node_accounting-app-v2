const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.statusCode = 200;
  res.send(expenseService.getAll(req.query));
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expense);
};

const postExpense = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!userService.getById(userId)) {
    return res.sendStatus(400);
  }

  if (
    !spentAt ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string'
  ) {
    return res.sendStatus(400);
  }

  const expense = expenseService.create(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.remove(id);

  return res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expenseService.update(id, req.body));
};

module.exports = {
  getAll,
  getById,
  postExpense,
  deleteExpense,
  updateExpense,
};
