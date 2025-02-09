const expensesServices = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const expenses = expensesServices.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount < 0 || !category || !note) {
    return res.status(400).send();
  }

  const findUser = userService.getUserById(userId);

  if (!findUser) {
    return res.status(400).send();
  }

  const newExpense = expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return res.status(201).send(newExpense);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send();
  }

  const expense = expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  return res.status(200).send(expense);
};

const removeExpenses = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  expensesServices.deleteExpense(id);

  return res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  const updatedExpense = expensesServices.updateExpense(id, req.body);

  return res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  create,
  getById,
  removeExpenses,
  update,
};
