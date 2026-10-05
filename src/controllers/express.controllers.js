const expensesService = require('../services/expense.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(await expensesService.getAll(userId, categories, from, to));
};

const getById = (req, res) => {
  const { id } = req.params;
  const isNotId = expensesService.getById(id);

  if (!isNotId) {
    return res.status(404).send({ message: 'Not found' });
  }
  res.send(isNotId);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const ex = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!ex) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(201).json(ex);
};

const remove = async (req, res) => {
  const { id } = req.params.id;

  if (!expensesService.getById(id)) {
    res.status(404).send({ message: 'Not found' });

    return;
  }
  await expensesService.deletaById(id);

  return res.status(204);
};

const upDate = async (req, res) => {
  const { id } = req.params.id;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id) {
    res.status(400).send('Bad Request');

    return;
  }

  const expensUpdate = await expensesService.getById(id);

  if (!expensUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  if (!spentAt && !title && !amount && !category && !note) {
    res.status(400).send('Bad Request');
  }

  const expense = await expensesService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (expense === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(expensUpdate);
};

const expensesController = {
  getAll,
  getById,
  remove,
  upDate,
  create,
};

module.exports = {
  expensesController,
};
