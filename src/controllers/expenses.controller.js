const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.set('Content-Type', 'application/json');
  res.json(expenses);
};

const getById = async (req, res) => {
  const expense = await expensesService.getById(parseInt(req.params.id));

  if (!expense) {
    return res.sendStatus(404);
  }

  res.set('Content-Type', 'application/json');
  res.json(expense);
};

const add = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    ...(note ? { note } : {}),
  });

  res.set('Content-Type', 'application/json');
  res.status(201).json(expense);
};

const remove = async (req, res) => {
  const expenseId = parseInt(req.params.id);

  if (!expensesService.getById(expenseId)) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = await expensesService.getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id: expenseId,
    ...req.body,
  });

  res.set('Content-type', 'application/json');
  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  expensesController,
};
