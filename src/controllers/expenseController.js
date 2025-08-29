/* eslint-disable @typescript-eslint/no-var-requires */
const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getAllController = (req, res) => {
  const expenses = expensesService.getAll({
    userId: req.query.userId,
    categories: req.query.categories,
    from: req.query.from,
    to: req.query.to,
  });

  res.json(expenses);
};

const getByIdController = (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const expense = expensesService.getById(id);

  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json(expense);
};

const createController = (req, res) => {
  const { title, userId, spentAt, amount, category, note } = req.body;

  const user = userService.getById(Number(userId));

  if (!user) return res.status(400).json({ message: 'User not found' });

  if (!title || !userId || !spentAt || !amount || !category) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const expense = expensesService.create(
    title,
    Number(userId),
    new Date(spentAt).toISOString(),
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const deleteOneController = (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const deleted = expensesService.deleteById(id);

  if (!deleted) return res.status(404).json({ message: 'Expense not found' });
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const expense = expensesService.getById(id);

  if (!expense) return res.status(404).json({ message: 'Expense not found' });

  const { title, userId, spentAt, amount, category, note } = req.body;

  if (!title && !userId && !spentAt && !amount && !category && !note) {
    return res
      .status(400)
      .json({ message: 'At least one updatable field must be provided' });
  }

  let numericUserId;

  if (userId !== undefined) {
    const user = userService.getById(Number(userId));

    if (!user) return res.status(400).json({ message: 'User not found' });
    numericUserId = Number(userId);
  }

  const updated = expensesService.update({
    id: Number(req.params.id),
    title,
    userId: numericUserId ?? expense.userId,
    spentAt: spentAt ? new Date(spentAt).toISOString() : expense.spentAt,
    amount,
    category,
    note,
  });

  res.json(updated);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
