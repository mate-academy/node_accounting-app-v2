const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let resultExpenses = expenseService.getAllExpenses();

  if (userId) {
    resultExpenses = resultExpenses.filter(
      (expense) => +userId === expense.userId,
    );
  }

  if (from && to) {
    resultExpenses = resultExpenses.filter(
      (expense) =>
        new Date(from) < new Date(expense.spentAt) &&
        new Date(expense.spentAt) < new Date(to),
    );
  }

  if (categories) {
    resultExpenses = resultExpenses.filter(
      (expanse) => categories === expanse.category,
    );
  }
  res.send(resultExpenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenceById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.status(200);
  res.json(expense);
};

const createExpance = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.createExpence(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpenceById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.patchExpence(id, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }
  res.status(200).json(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpenceById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpence(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpance,
  updateExpense,
  removeExpense,
};
