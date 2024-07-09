const expensesHelpers = require('../helpers/expense.helpers');
const expensesService = require('../services/expense.service');

const create = (req, res) => {
  const { userId, spentAt, title, amount, note, category } = req.body;

  const requestData = {
    userId,
    title,
    amount,
    category,
    note,
    res,
  };

  if (
    expensesHelpers.isUserExist(userId, res) ||
    expensesHelpers.validateRequestData(requestData)
  ) {
    return;
  }

  const expense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  const expense = expensesService.getExpenseById(id);

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (expensesHelpers.isExpenseExist(id, res)) {
    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update({ id, title });

  res.send(updatedExpense);
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
