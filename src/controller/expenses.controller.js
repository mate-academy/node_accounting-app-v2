const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  if (!userId && !categories && (!from || !to)) {
    res.send(expensesService.getAllExpenses());
  }

  const normalizedCategories = expensesService.normalizeCategory(categories);

  let filteredExpenses = expensesService.getAllExpenses();

  if (userId) {
    filteredExpenses = expensesService.filterExpensesById(userId);
  }

  if (normalizedCategories) {
    filteredExpenses =
      expensesService.filterExpensesByCategory(normalizedCategories);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expensesService.filterExpensesByDate(fromDate, toDate);
  }

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expenses = expensesService.getAllExpenses();
  const updatedExpenses = expensesService.removeExpense(id);

  if (expenses.length === updatedExpenses.length) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const chosenExpense = expensesService.getById(id);

  if (!chosenExpense) {
    return res.sendStatus(404);
  }

  const expense = expensesService.updateExpense(chosenExpense, req);

  res.status(200).send(expense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
