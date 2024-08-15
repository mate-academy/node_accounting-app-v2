const expenseService = require('../services/expenses.service.js');
const userService = require('../services/users.service.js');

const getAll = (req, res) => {
  try {
    const expenses = expenseService.getAll(req.query);

    res.statusCode = 200;
    res.send(expenses);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOne = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expenseService.getOne(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const createExpense = (req, res) => {
  const { userId } = req.body;

  try {
    const user = userService.getOne(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.createExpense(req.body);

    res.statusCode = 201;
    res.send(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expenseService.getOne(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = expenseService.updateExpense(id, req.body);

    res.send(updatedExpense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getOne(id)) {
    res.sendStatus(404);

    return;
  }

  try {
    expenseService.removeExpense(id);

    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
