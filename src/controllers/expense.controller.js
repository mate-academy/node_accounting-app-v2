const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = (req, res) => {
  let result = expenseService.getAll();
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((e) => cats.includes(e.category));
  }

  if (from) {
    const fromDate = new Date(from);

    result = result.filter((e) => new Date(e.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    result = result.filter((e) => new Date(e.spentAt) <= toDate);
  }

  res.send(result);
};

const getOne = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    !spentAt ||
    !title ||
    typeof amount !== 'number' ||
    !category
  ) {
    res.status(400).send('Missing required fields');

    return;
  }

  if (userService.getById(userId) === null) {
    res.status(400).send('User not found');

    return;
  }

  const expense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  res.status(201).send(expense);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = expenseService.update({
    id,
    userId: expense.userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getById(id) || null;

  if (!expense) {
    return res.sendStatus(404);
  }
  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
