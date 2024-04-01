const expensesService = require('../services/expenses');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;
  res.send(expensesService.getAll(userId, categories, from, to));
};

const getById = (req, res) => {
  const { id } = req.params;
  const Expense = expensesService.getById(id);

  if (!Expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(Expense);
};

const create = (req, res) => {
  const body = req.body;
  const { userId, spentAt, title, amount, category, note } = body;

  if (
    !userId ||
    !spentAt ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(body);

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
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

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const Expense = expensesService.update(id, body);

  if (!Expense) {
    res.sendStatus(404);

    return;
  }
  res.send(Expense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
