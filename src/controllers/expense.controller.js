const expensesService = require('../services/expense.service');
const expensesHelpers = require('../helpers/expense.helpers');
const userHelpers = require('../helpers/user.helpers');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getExpenses(userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userHelpers.isUserExist(userId)) {
    res.status(400).send('User with this id not found');

    return;
  }

  try {
    expensesHelpers.validateRequestBodyFields(req.body);

    const expense = expensesService.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;

    res.send(expense);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  if (expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (expensesHelpers.isExpenseExist(id)) {
    res.status(404).send('Expense with this id not found');

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update({
    id,
    title,
  });

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
