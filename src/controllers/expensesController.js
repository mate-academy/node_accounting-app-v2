const serviceExpenses = require('../services/expensesServise');
const serviceUsers = require('../services/usersService');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filterExpenses = serviceExpenses.getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.status(200).send(filterExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = serviceUsers.getUserById(userId);

  if (!user || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = serviceExpenses.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  serviceExpenses.removeExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;
  const expense = serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExp = serviceExpenses.updateExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExp) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExp);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
