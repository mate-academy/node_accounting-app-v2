const {
  getAllExpensesService,
  createNewExpenseService,
  getExpenseByIdService,
  deleteExpenseByIdService,
  updateExpenseByIdService,
} = require('../services/expenses.service');
const { getUserByIdService } = require('../services/users.service');

const getAllExpenses = (req, res) => {
  const expenses = getAllExpensesService(req.query);

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = getUserByIdService(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = createNewExpenseService(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseByIdService(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseByIdService(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  deleteExpenseByIdService(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = getExpenseByIdService(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = updateExpenseByIdService(id, title);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
