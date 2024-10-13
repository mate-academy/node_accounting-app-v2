const {
  filterExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  getExpenses,
} = require('./../services/expense.service');
const { getUser } = require('./../services/user.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    res.statusCode = 200;
    res.send(filterExpenses(req.query));

    return;
  }

  const expenses = getExpenses();

  res.statusCode = 200;
  res.send(expenses);
};

const add = (req, res) => {
  const { userId, category, spentAt, title, amount, note } = req.body;
  const user = getUser(userId);

  if (!user || !category || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const rawExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = addExpense(rawExpense);

  res.statusCode = 201;
  res.send(expense);
};

const get = (req, res) => {
  const { id } = req.params;
  const expense = getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = Object.assign(expense, req.body);

  updateExpense(newExpense);
  res.send(newExpense);
};

module.exports = { getAll, add, get, remove, update };
