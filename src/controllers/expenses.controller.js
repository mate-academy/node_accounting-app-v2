const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let arrCategories = categories;

  if (typeof arrCategories === 'string') {
    arrCategories = [categories];
  }

  const numberUserId = Number(userId);

  if (userId && Number.isNaN(numberUserId)) {
    return res.sendStatus(400);
  }

  const result = expensesService.getByQuery({
    userId: numberUserId,
    categories: arrCategories,
    from,
    to,
  });

  res.send(result);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const numberUserId = Number(userId);
  const numberAmount = Number(amount);

  const date = new Date(spentAt).getTime();

  if (Number.isNaN(numberUserId) || !usersService.getById(numberUserId)) {
    return res.sendStatus(400);
  }

  if (
    Number.isNaN(date) ||
    Number.isNaN(numberAmount) ||
    [title, category, note].some((v) => typeof v !== 'string')
  ) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.create({
    userId: numberUserId,
    spentAt,
    title,
    amount: numberAmount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const getById = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(numberId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = expensesService.deleteById(numberId);

  if (!result) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(numberId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, amount } = req.body;

  const updateData = {};

  if (amount !== undefined) {
    const numberAmount = Number(amount);

    if (Number.isNaN(numberAmount)) {
      return res.sendStatus(400);
    }

    updateData.amount = numberAmount;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt).getTime();

    if (Number.isNaN(date)) {
      return res.sendStatus(400);
    }

    updateData.spentAt = spentAt;
  }

  for (const field of ['title', 'category', 'note']) {
    const value = req.body[field];

    if (value === undefined) {
      continue;
    }

    if (typeof value !== 'string') {
      return res.sendStatus(400);
    }

    updateData[field] = value;
  }

  const updatedExpense = expensesService.update(numberId, updateData);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
