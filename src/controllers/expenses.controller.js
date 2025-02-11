const { expensesService } = require('../services/expenses.service');
const { userService } = require('../services/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) => expense.category === categories);
  }

  if (from) {
    const fromDate = new Date(from);

    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= toDate,
    );
  }

  res.json(expenses);
};

const getOne = (req, res) => {
  const expense = expensesService.getOne(+req.params.id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = userService.getById(+userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const createdExpense = expensesService.create(req.body);

  res.status(201).json(createdExpense);
};

const remove = (req, res) => {
  const expense = expensesService.getOne(+req.params.id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  expensesService.remove(+req.params.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expenseToUpdate = expensesService.getOne(+id);

  if (!expenseToUpdate) {
    return res.status(404).send('Expense not found');
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res
      .status(400)
      .json({ error: 'At least one field must be provided for update' });
  }

  const updatedData = {};

  if (spentAt) {
    updatedData.spentAt = spentAt;
  }

  if (title) {
    updatedData.title = title;
  }

  if (amount) {
    updatedData.amount = amount;
  }

  if (category) {
    updatedData.category = category;
  }

  if (note) {
    updatedData.note = note;
  }

  const updatedExpense = expensesService.update(+id, updatedData);

  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  getOne,
  create,
  remove,
  update,
};

module.exports = {
  expensesController,
};
