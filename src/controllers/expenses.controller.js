const serviceExpenses = require('./../services/expenses.service');
const serviceUsers = require('./../services/users.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filterExpenses = serviceExpenses.getAll(userId, categories, from, to);

  res.status(200).send(filterExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = serviceExpenses.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = serviceUsers.getById(userId);

  if (!user || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = serviceExpenses.create(
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
  const { id } = req.params;
  const expense = serviceExpenses.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  serviceExpenses.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = serviceExpenses.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExp = serviceExpenses.update(id, body);

  if (!updatedExp) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExp);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
