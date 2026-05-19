const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const get = (req, res) => {
  const filters = req.query;

  res.json(expensesService.getAll(filters));
};

const getOne = (req, res) => {
  const id = Number(req.params.id);
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined ||
    note === undefined
  ) {
    return res.sendStatus(400);
  }

  if (!usersService.getById(userId)) {
    return res.sendStatus(400);
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.json(expense);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesService.update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

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
  update,
  remove,
};
