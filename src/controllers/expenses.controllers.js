const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((e) => e.category === categories);
  }

  if (from) {
    expenses = expenses.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    expenses = expenses.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.status(200).send(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getOne(+id)) {
    res.status(404).send('Not found');
  }

  if (typeof +id !== 'number') {
    res.status(400).send('Write correct data');

    return;
  }

  const expense = expensesService.getOne(+id);

  if (!expense) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof +userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string' ||
    !usersService.getOne(+userId)
  ) {
    res.status(400).send('Write correct data');

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getOne(id)) {
    res.status(404).send('Not found');

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const body = req.body;
  const { id } = req.params;

  if (expensesService.getOne(+id) === null) {
    res.status(404).send('Not found');

    return;
  }

  if (Object.keys(body).length === 0) {
    res.status(400).send('Write correct data');

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, body);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
