const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getAll(userId, categories, from, to);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!(userId && spentAt && title && amount && category && note)) {
    return res.status(400).end();
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400).end();
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

const remove = async (req, res) => {
  const expense = await expensesService.getById(req.params.expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(req.params.expenseId);

  res.status(204).end();
};

const update = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const expense = await expensesService.getById(req.params.expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  if (userId) {
    const user = await usersService.getById(userId);

    if (!user) {
      return res.sendStatus(400).end();
    }
  }

  const updatedExpense = await expensesService.update({
    id: req.params.expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
