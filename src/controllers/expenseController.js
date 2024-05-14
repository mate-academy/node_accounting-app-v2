const expenseService = require('../services/expenseService');
const { getUserById } = require('../services/userService');
const { STATUS_CODE } = require('../utils/statusCodes');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const id = Number(userId);

  const AllExpenses = expenseService.getAllExpenses(id, categories, from, to);

  res.send(AllExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = getUserById(userId);

  if (!user) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!userId || typeof userId !== 'number') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!spentAt || isNaN(new Date(spentAt))) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!title || typeof title !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!amount || typeof amount !== 'number') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!category || typeof category !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  if (!note || typeof note !== 'string') {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = expenseService.createExpense(expense);

  res.status(STATUS_CODE.CREATED).send(newExpense);
};

const get = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  expenseService.removeExpense(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = expenseService.getExpenseById(id);

  if (!spentAt && !title && !amount && !category && !note) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (!expense) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (spentAt && isNaN(new Date(spentAt))) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (title && typeof title !== 'string') {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (amount && typeof amount !== 'number') {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (category && typeof category !== 'string') {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (note && typeof note !== 'string') {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  const fieldsToUpdate = {
    id: Number(id) || expense.id,
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  };

  const updatedExpense = expenseService.updateExpense(fieldsToUpdate);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
