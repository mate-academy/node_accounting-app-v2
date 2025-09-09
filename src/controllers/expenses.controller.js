const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getExpenses();

  let filteredExpences = expenses;

  if (userId) {
    filteredExpences = filteredExpences.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories];

    filteredExpences = filteredExpences.filter((expense) =>
      // eslint-disable-next-line prettier/prettier
      categoryArray.includes(expense.category));
  }

  if (from) {
    filteredExpences = filteredExpences.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    filteredExpences = filteredExpences.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.status(200);
  res.send(filteredExpences);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = await usersService.getUser(userId);

  if (!userExists) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!expense) {
    return res.sendStatus(400);
  }

  res.status(201);
  res.json(expense);
};

const getExpense = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(expense);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  const success = await expensesService.deleteExpense(id);

  if (!success) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const { spentAt, title, amount, category, note } = req.body;

  if (isNaN(id)) {
    return res.sendStatus(404);
  }

  const expense = await expensesService.updateExpense({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!expense) {
    return res.sendStatus(404);
  }
  res.status(200);
  res.json(expense);
};

module.exports.expensesController = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
