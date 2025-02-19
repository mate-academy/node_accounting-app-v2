const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  const query = req.query;
  const expenses = expenseService.get(query);

  res.send(expenses);
};

const getExpense = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expenseBody = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!Object.values(expenseBody).every((v) => v !== undefined)) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getUserById(Number(userId))) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.createExpense(expenseBody);

  res.statusCode = 201;
  res.send(expense);
};

const removeExpense = (req, res) => {
  let { id } = req.params;

  id = Number(id);

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  let { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  id = Number(id);

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  const newExpenseBody = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  for (const key in newExpenseBody) {
    if (!newExpenseBody[key]) {
      delete newExpenseBody[key];
    }
  }

  if (!Object.values(newExpenseBody).length) {
    res.sendStatus(422);

    return;
  }

  const expense = expenseService.updateExpense(id, newExpenseBody);

  res.send(expense);
};

module.exports = {
  get,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
