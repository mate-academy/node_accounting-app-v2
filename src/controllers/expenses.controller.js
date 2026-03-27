const expensesService = require('../services/expenses.service');

let nextExpenseId = 1;

const get = (expenses) => (req, res) => {
  res.json(expensesService.getAll(expenses, req.query));
};

const getOne = (expenses) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const reqId = expensesService.getById(expenses, id);

  if (!reqId) {
    return res.status(404).send('Not Found');
  }

  res.json(reqId);
};

const create = (users, expenses) => (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const parsedUserId = Number(userId);
  const parsedAmount = Number(amount);

  if (Number.isNaN(parsedUserId)) {
    return res.status(400).send('Bad Request');
  }

  if (Number.isNaN(parsedAmount)) {
    return res.status(400).send('Bad Request');
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).send('Bad Request');
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return res.status(400).send('Bad Request');
  }

  if (typeof note !== 'string') {
    return res.status(400).send('Bad Request');
  }

  const userExists = users.some((user) => user.id === parsedUserId);

  if (!userExists) {
    return res.status(400).send('Bad Request');
  }

  let spentAtValue;

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).send('Bad Request');
    }

    spentAtValue = date.toISOString();
  } else {
    spentAtValue = new Date().toISOString();
  }

  const expense = {
    id: nextExpenseId,
    userId: parsedUserId,
    spentAt: spentAtValue,
    title,
    amount: parsedAmount,
    category,
    note,
  };

  nextExpenseId += 1;
  expenses.push(expense);

  return res.status(201).json(expense);
};

const update = (users, expenses) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const { userId, title, spentAt, amount, category, note } = req.body;

  const updates = {};

  if (userId !== undefined) {
    const parsedUserId = Number(userId);

    if (Number.isNaN(parsedUserId)) {
      return res.status(400).send('Bad Request');
    }

    const userExists = users.some((user) => user.id === parsedUserId);

    if (!userExists) {
      return res.status(400).send('Bad Request');
    }

    updates.userId = parsedUserId;
  }

  if (amount !== undefined) {
    const parsedAmount = Number(amount);

    if (Number.isNaN(parsedAmount)) {
      return res.status(400).send('Bad Request');
    }

    updates.amount = amount;
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).send('Bad Request');
    }

    updates.title = title;
  }

  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim() === '') {
      return res.status(400).send('Bad Request');
    }

    updates.category = category;
  }

  if (note !== undefined) {
    if (typeof note !== 'string') {
      return res.status(400).send('Bad Request');
    }

    updates.note = note;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).send('Bad Request');
    }

    updates.spentAt = date.toISOString();
  }

  const expense = expensesService.getById(expenses, id);

  if (!expense) {
    return res.status(404).send('Not Found');
  }

  Object.assign(expense, updates);

  return res.status(200).json(expense);
};

const remove = (expenses) => (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Bad Request');
  }

  const deleted = expensesService.remove(expenses, id);

  if (!deleted) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
