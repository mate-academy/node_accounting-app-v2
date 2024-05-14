const expensesService = require('../services/expenses.service');
const { getById } = require('../services/users.service');

const get = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getExpenses(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const body = req.body;
  const { userId, spentAt, title, amount, category } = body;
  const user = getById(userId);

  if (!user || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.create(body);

  res.statusCode = 201;
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(id, body);

  res.statusCode = 200;

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
