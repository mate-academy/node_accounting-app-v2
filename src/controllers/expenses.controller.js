const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  res.send(expensesService.getAll(req.query));
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note = '' } = req.body;

  if (
    typeof userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    usersService.getById(userId) === null
  ) {
    res.sendStatus(400);

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

  res.status(201).send(expense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getById(id);

  if (expense === null) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (expensesService.getById(id) === null) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (expensesService.getById(id) === null) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.update({ id, title });

  res.send(expense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
