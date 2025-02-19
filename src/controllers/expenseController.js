const expenseService = require('../services/expenseService');
const userService = require('../services/userService');
const { STATUS_CODE } = require('../utils/statusCodes');

const getAll = (req, res) => {
  const allExpenses = expenseService.getAll(req.query);

  res.send(allExpenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = userService.getById(userId);
  const isValidBody =
    user &&
    (!userId || (userId && typeof userId === 'number')) &&
    (!spentAt || (spentAt && !isNaN(new Date(spentAt)))) &&
    (!title || (title && typeof title === 'string')) &&
    (!amount || (amount && typeof amount === 'number')) &&
    (!category || (category && typeof category === 'string')) &&
    (!note || (note && typeof note === 'string'));

  if (!isValidBody) {
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

  const newExpense = expenseService.create(expense);

  res.status(STATUS_CODE.CREATED).send(newExpense);
};

const get = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = expenseService.getById(id);
  const isValidBody =
    expense &&
    !(!spentAt && !title && !amount && !category && !note) &&
    (!spentAt || (spentAt && isNaN(new Date(spentAt)))) &&
    (!title || (title && typeof title === 'string')) &&
    (!amount || (amount && typeof amount === 'number')) &&
    (!category || (category && typeof category === 'string')) &&
    (!note || (note && typeof note === 'string'));

  if (!isValidBody) {
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

  const updatedExpense = expenseService.update(fieldsToUpdate);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  create,
  get,
  remove,
  update,
};
