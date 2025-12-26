const usersService = require('../services/users.service.js');
const service = require('../services/expenses.service.js');

const getMore = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let arrCategories = categories;

  if (typeof arrCategories === 'string') {
    arrCategories = [categories];
  }

  const numberUserId = Number(userId);

  if (userId && Number.isNaN(numberUserId)) {
    return res.sendStatus(400);
  }

  const result = service.getByQuery({
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

  const newExpense = service.create({
    userId: numberUserId,
    spentAt,
    title,
    amount: numberAmount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const expense = service.getById(numberId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = service.deleteById(numberId);

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

  const { spentAt, title, amount, category, note } = req.body;
  const numberAmount = Number(amount);
  const date = new Date(spentAt).getTime();

  const data = {};

  if (amount && !numberAmount) {
    return res.sendStatus(400);
  } else if (numberAmount) {
    data.amount = numberAmount;
  }

  if (spentAt && !date) {
    return res.sendStatus(400);
  } else if (date) {
    data.spentAt = spentAt;
  }

  if (
    [title, category, note].some(
      (v) => v !== undefined && typeof v !== 'string',
    )
  ) {
    return res.sendStatus(400);
  }

  const updatedExpense = service.update(numberId, {
    ...data,
    title,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.send(updatedExpense);
};

module.exports = {
  getMore,
  create,
  getOne,
  deleteOne,
  update,
};
