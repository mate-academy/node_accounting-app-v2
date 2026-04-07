const expenseService = require('./expenses.service');
const usersService = require('../users/users.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = await expenseService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses.filter((expense) => expense.category === categories);
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.status(200).json(expenses);
};

const getById = async (req, res) => {
  const expense = await expenseService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send();
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.status(400).send();
  }

  const expense = await expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const deleteById = async (req, res) => {
  const expense = await expenseService.deleteById(req.params.id);

  if (!expense) {
    return res.status(404).send();
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;
  const updatedExpense = await expenseService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateExpense,
};
