const expenseService = require('../services/expense.service');
const { getById: getUserById } = require('../services/user.service');

const get = (req, res) => {
  res.send(expenseService.getAll(req.query));
};

const getOne = (req, res) => {
  const expense = req.entry;

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt = new Date(),
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id } = req.entry;

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.entry;

  const updatedExpense = expenseService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getOne,
  get,
  create,
  remove,
  update,
};
