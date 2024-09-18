const expensesServise = require('../services/expenses.service');
const { getById: getUserById } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesServise.getAll(req.query);

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await getUserById(userId);

  if (!user || !userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesServise.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expensesServise.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expensesServise.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesServise.deleteById(id);

  res.status(204).json(expense);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await expensesServise.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesServise.updateById(id, {
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
