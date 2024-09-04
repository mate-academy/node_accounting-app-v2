const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  try {
    const expenses = expenseService.getAllExpenses(req.query);

    res.statusCode = 200;
    res.send(expenses);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getExpenseForPerson = (req, res) => {
  try {
    const { id } = req.params;
    const expense = expenseService.getExpenseById(id);

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

const removeExpense = (req, res) => {
  try {
    const { id } = req.params;

    if (!expenseService.getExpenseById(id)) {
      res.sendStatus(404);

      return;
    }

    expenseService.remove(id);

    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateExpense = (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const expense = expenseService.getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = expenseService.updateData(id, data);

    res.send(updatedExpense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const addExpense = (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = getUserById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseForPerson,
  updateExpense,
  removeExpense,
};
