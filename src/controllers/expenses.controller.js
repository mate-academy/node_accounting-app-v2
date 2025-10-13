const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const { category, userId, fromDate, toDate } = req.query;
  const result = expenseService.getExpenses({
    category,
    userId,
    fromDate,
    toDate,
  });

  res.status(200).send(result);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isUser = userService.getUser(userId);

  if (!isUser) {
    return res.sendStatus(400);
  }

  if (
    typeof userId !== 'number' ||
    !userId ||
    (note !== undefined && typeof note !== 'string') ||
    typeof title !== 'string' ||
    !title ||
    typeof amount !== 'number' ||
    !amount ||
    typeof category !== 'string' ||
    !category ||
    typeof spentAt !== 'string' ||
    isNaN(Date.parse(spentAt)) ||
    !spentAt
  ) {
    res.sendStatus(422);

    return;
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
  const expenseToRemove = expenseService.getExpense(id);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }
  expenseService.deleteExpense(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expenseToUpdate = expenseService.getExpense(id);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (
    (title !== undefined && typeof title !== 'string') ||
    (note !== undefined && typeof note !== 'string') ||
    (amount !== undefined && typeof amount !== 'number') ||
    (category !== undefined && typeof category !== 'string') ||
    (spentAt !== undefined &&
      typeof spentAt !== 'string' &&
      isNaN(Date.parse(spentAt)))
  ) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expenseService.updateExpense({
    id,
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
