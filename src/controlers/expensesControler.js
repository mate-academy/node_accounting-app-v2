const expensesServices = require('../services/expensesServices');
const usersServices = require('../services/usersServices');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const parsedUserId = userId ? Number(userId) : undefined;

  if (Number.isNaN(parsedUserId)) {
    return res.status(400).send('Bad request');
  }

  const parsCategories = categories ? categories.split(',') : [];

  res
    .status(200)
    .send(expensesServices.get(parsedUserId, parsCategories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (Number.isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const expense = expensesServices.getOne(normalaizedId);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const normalaizedId = Number(userId);

  if (
    Number.isNaN(normalaizedId) ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note
  ) {
    return res.status(400).send('Bad request');
  }

  const user = usersServices.getOne(normalaizedId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const newExpense = expensesServices.add({
    userId: Number(userId),
    title,
    spentAt,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (Number.isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const toDelete = expensesServices.getOne(normalaizedId);

  if (!toDelete) {
    return res.status(404).send('Not found');
  }

  expensesServices.remove(Number(id));
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (Number.isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const toUpdate = expensesServices.getOne(normalaizedId);

  if (!toUpdate) {
    return res.status(404).send('Not found');
  }

  res
    .status(200)
    .send(expensesServices.update({ id: normalaizedId, ...req.body }));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
