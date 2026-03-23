/* eslint-disable max-len */
/* eslint-disable no-console */

const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');
const { parseDate } = require('../helpers/dateHelper.js');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const parsedUserId = userId ? Number(userId) : undefined;
  const parsedFrom = parseDate(from);
  const parsedTo = parseDate(to);

  if (parsedFrom === null || parsedTo === null) {
    return res.status(400).send({ error: 'Invalid date format' });
  }

  const expenses = expensesService.getAll(
    parsedUserId,
    categories,
    parsedFrom,
    parsedTo,
  );

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    return res.status(400).json({ message: 'No required data' });
  }

  if (parseDate(spentAt) === null) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  if (!Number.isInteger(amount)) {
    return res.status(400).json({ message: 'Invalid amount format' });
  }

  const user = usersService.getById(userId);

  if (!user) {
    return res
      .status(400)
      .json({ message: `User with id=${userId} not found` });
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (spentAt && parseDate(spentAt) === null) {
    return res.status(400).send({ error: 'Invalid date format' });
  }

  if (amount !== undefined && !Number.isInteger(amount)) {
    return res.status(400).send({ error: 'Invalid amount format' });
  }

  const updatedExpense = expensesService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
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
