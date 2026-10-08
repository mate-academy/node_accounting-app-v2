const expenseServices = require('../services/expenses.services');
const userServices = require('../services/users.services');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filters = {};

  if (userId !== undefined) {
    filters.userId = Number(userId);
  }

  if (categories !== undefined) {
    filters.categories = [].concat(categories);
  }

  if (from !== undefined) {
    filters.from = new Date(from);
  }

  if (to !== undefined) {
    filters.to = new Date(to);
  }

  res.send(expenseServices.getAll(filters));
};

const getExpense = (req, res) => {
  const expense = expenseServices.getExpense(req.params.id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  if (!userServices.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!expenseServices.getExpense(id)) {
    res.sendStatus(404);

    return;
  }

  const isValid =
    (spentAt === undefined || typeof spentAt === 'string') &&
    (title === undefined || typeof title === 'string') &&
    (amount === undefined || typeof amount === 'number') &&
    (category === undefined || typeof category === 'string');

  if (!isValid) {
    res.sendStatus(400);

    return;
  }

  res.send(expenseServices.update(id, spentAt, title, amount, category, note));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getExpense(id)) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getExpense,
  add,
  update,
  remove,
};
