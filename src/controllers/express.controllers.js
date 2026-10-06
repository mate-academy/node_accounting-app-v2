const expensesService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.status(200).json(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).send({ message: 'Not found' });
  }
  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send({ message: 'Bad request' });
  }
  // Перевірка чи існує користувач

  const user = userService.getById(userId);

  if (!user) {
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

const deleteById = (req, res) => {
  const { id } = req.params;
  const removed = expensesService.deleteById(id);

  if (!removed) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.status(204).send();
};

const upDate = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id) {
    return res.status(400).send('Bad Request');
  }

  const expensUpdate = expensesService.getById(id);

  if (!expensUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.status(400).send('Bad Request');
  }

  const expense = expensesService.upDate({
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

  res.status(200).json(expense);
};

const expensesController = {
  getAll,
  getById,
  deleteById,
  upDate,
  create,
};

module.exports = {
  expensesController,
};
