const userService = require('../services/users.services.js');
const expenseService = require('../services/expenses.services.js');

const getAllExpenses = (expenses) => (req, res) => {
  const { userId, category, from, to, categories } = req.query;
  let result = [...expenses];

  if (userId !== undefined) {
    result = result.filter((exp) => String(exp.userId) === String(userId));
  }

  if (category !== undefined) {
    result = result.filter((exp) => exp.category === category);
  }

  if (categories !== undefined) {
    const categoryList = categories.split(',');

    result = result.filter((exp) => categoryList.includes(exp.category));
  }

  if (from !== undefined) {
    result = result.filter((exp) => new Date(exp.spentAt) >= new Date(from));
  }

  if (to !== undefined) {
    result = result.filter((exp) => new Date(exp.spentAt) <= new Date(to));
  }

  res.status(200).send(result);
};

let expenseNumber = 1;

const postExpenses = (users, expenses) => (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = userService.findUser(users, userId);

  if (!user) {
    res.status(400).send('Bad request');

    return;
  }

  if (
    !userId ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    (note !== undefined && typeof note !== 'string')
  ) {
    res.status(400).send('Bad request');

    return;
  }

  const newExpense = {
    id: expenseNumber,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenseNumber++;

  expenses.push(newExpense);
  res.status(201).send(newExpense);
};

const getExpenseById = (expenses) => (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad request');

    return;
  }

  const expense = expenseService.findExpense(expenses, id);

  if (!expense) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(expense);
};

const deleteExpense = (expenses) => (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex((exp) => exp.id === +id);

  if (index === -1) {
    return res.status(404).send('Not found');
  }

  expenses.splice(index, 1);

  res.sendStatus(204);
};

const patchExpense = (expenses) => (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  if (
    (spentAt !== undefined && typeof spentAt !== 'string') ||
    (title !== undefined && typeof title !== 'string') ||
    (amount !== undefined && typeof amount !== 'number') ||
    (category !== undefined && typeof category !== 'string') ||
    (note !== undefined && typeof note !== 'string')
  ) {
    res.status(400).send('Bad request');

    return;
  }

  const expense = expenseService.findExpense(expenses, id);

  if (!expense) {
    res.status(404).send('Not found');

    return;
  }

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (title) {
    expense.title = title;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  res.status(200).send(expense);
};

module.exports = {
  getAllExpenses,
  postExpenses,
  getExpenseById,
  deleteExpense,
  patchExpense,
};
