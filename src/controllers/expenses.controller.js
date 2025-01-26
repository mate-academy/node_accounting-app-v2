const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expensesService.getExpenses(
    userId,
    categories,
    from,
    to,
  );

  return res.status(200).json(filteredExpenses);
};

const getOne = (req, res) => {
  const expenseId = Number(req.params.id);
  const expense = expensesService.getExpense(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const isUser = usersService.getUser(userId);

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  if (!isUser) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const update = (req, res) => {
  const expenseId = Number(req.params.id);
  const expenseTitle = req.body.title;
  const updatedExpense = expensesService.updateExpense(expenseId, expenseTitle);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.json(updatedExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.id);
  const index = expensesService
    .getExpenses()
    .findIndex((exp) => exp.id === expenseId);

  if (index === -1) {
    return res.status(404).json('Not Found');
  }

  expensesService.removeExpense(index);

  return res.status(204).end();
};

module.exports = {
  get,
  create,
  getOne,
  update,
  remove,
};
