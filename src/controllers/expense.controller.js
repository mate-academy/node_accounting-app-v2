const expensesService = require('./../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const categoriesArray =
    typeof categories === 'string' ? [categories] : categories;

  if (categoriesArray && !Array.isArray(categoriesArray)) {
    return res.status(400).send({ error: 'Categories must be an array' });
  }

  res
    .status(200)
    .send(expensesService.getAll(userId, categoriesArray, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.statusCode = 200;
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount && category && note)) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .send({ error: 'Amount must be a valid number greater than 0' });
  }

  const user = userService.getById(userId);

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  const expense = expensesService.create(
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
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).end();
  }

  expensesService.remove(id);

  res.status(204).end();
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).end();
  }

  if (typeof title !== 'string') {
    return res.status(400).end();
  }

  const updatedExpense = expensesService.update({
    id,
    title,
  });

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
