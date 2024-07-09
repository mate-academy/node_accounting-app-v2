const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const expenses = expenseService.getAllExpenses(req.query);

  res.statusCode = 200;
  res.send(expenses);
};

const getExpenseForPerson = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  // if (
  //   typeof userId !== 'number' ||
  //   typeof title !== 'string' ||
  //   typeof amount !== 'number' ||
  //   typeof category !== 'string' ||
  //   typeof note !== 'string'
  // ) {
  //   res.sendStatus(400);

  //   return;
  // }

  const updatedExpense = expenseService.updateData(id, data);

  res.send(updatedExpense);
};

const addExpense = (req, res) => {
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
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseForPerson,
  updateExpense,
  removeExpense,
};
