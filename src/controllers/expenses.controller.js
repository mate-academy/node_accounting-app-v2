const expensesService = require('../services/expenses.services');
const usersService = require('../services/users.services');

const getAll = async (req, res) => {
  const expenses = expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  let expense = {};

  if (!title || !spentAt || !userId || !amount || !category || !note) {
    res.sendStatus(400);
  } else if (!usersService.findUser(userId)) {
    res.sendStatus(400);
  } else {
    const id = userId;

    expense = {
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
      id: id,
      userId: userId,
    };

    expensesService.addExpense(expense);

    res.status(201).send(expense);
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  const expense = expensesService.findExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let expense = expensesService.findExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expense = Object.assign(expense, { title });

  res.send(expense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!expensesService.findExpense(id)) {
    return res.sendStatus(404);
  }

  const newExpenses = expensesService.filteredByIdExpenses(id);

  expensesService.changeExpense(newExpenses);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  addExpense,
  removeExpense,
  getExpense,
  updateExpense,
};
