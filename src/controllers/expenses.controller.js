/* eslint-disable spaced-comment */
const expensesService = require('../services/expenses.service.js');
const userService = require('../services/user.service.js');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const categoriesArray =
    typeof categories === 'string' ? [categories] : categories;

  if (categoriesArray && !Array.isArray(categoriesArray)) {
    return res.status(400).send({
      error: 'Categories must be an array',
    });
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
  const { title, amount, category, note } = req.body;
  const expense = expensesService.getById(id);

  if (!(title || amount || category || note)) {
    return res
      .status(404)
      .send({ error: 'At least one field is required to update' });
  }

  if (!expense) {
    return res.status(404).send({ error: 'Expense not found' });
  }

  //#region validate
  if (typeof title !== 'string') {
    return res.status(400).end();
  }

  if (
    amount &&
    (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0)
  ) {
    return res
      .status(400)
      .send({ error: 'Amount must be a valid number greater than 0' });
  }

  if (category && typeof category !== 'string') {
    return res.status(400).send({ error: 'Category must be a string' });
  }

  if (note && typeof note !== 'string') {
    return res.status(400).send({ error: 'Note must be a string' });
  }

  if (!expense) {
    return res.status(404).send({ error: 'Expense not found' });
  }
  //#endregion

  const updatedExpense = expensesService.update({
    id,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
