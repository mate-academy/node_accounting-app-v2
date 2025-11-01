const expenseService = require('../services/expenses.service.js');
const categoryService = require('../services/categories.service.js');

const get = (req, res) => {
  const { categories, userId, from, to } = req.query;
  const result = expenseService.getExpenses({
    categories,
    userId,
    from,
    to,
  });

  res.status(200).send(result);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpense(+id);

  if (!expense) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof userId !== 'number' ||
    userId === null ||
    (note !== undefined && typeof note !== 'string') ||
    typeof title !== 'string' ||
    !title ||
    typeof amount !== 'number' ||
    amount === null ||
    typeof category !== 'string' ||
    !category ||
    typeof spentAt !== 'string' ||
    isNaN(Date.parse(spentAt)) ||
    !spentAt
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const isUser = categoryService.getCategory(userId);

  if (!isUser) {
    return res.status(400).send({ message: 'User does not exist' });
  }

  const newExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expenseToRemove = expenseService.getExpense(+id);

  if (!expenseToRemove) {
    return res.status(404).send({ message: 'Expense not found' });
  }
  expenseService.deleteExpense(+id);
  res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expenseToUpdate = expenseService.getExpense(+id);

  if (!expenseToUpdate) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  if (
    (title !== undefined && typeof title !== 'string') ||
    (note !== undefined && typeof note !== 'string') ||
    (amount !== undefined && typeof amount !== 'number') ||
    (category !== undefined && typeof category !== 'string') ||
    (spentAt !== undefined &&
      (typeof spentAt !== 'string' || isNaN(Date.parse(spentAt))))
  ) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  if (amount !== undefined && typeof amount === 'number' && amount === 0) {
  } else if (amount !== undefined && typeof amount === 'number' && !amount) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const updatedExpense = expenseService.updateExpense({
    id: +id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
