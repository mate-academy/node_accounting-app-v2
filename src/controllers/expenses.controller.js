const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

let lastId = 0;

function getExpenses(req, res) {
  const searchParams = new URLSearchParams(req.url.split('?')[1]);

  const userId = searchParams.get('userId');
  const category = searchParams.get('category');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  res.send(expensesService.getSortedExpenses(userId, category, from, to));
}

function getExpense(req, res) {
  const id = req.params.id;
  const response = expensesService.getOne(id);

  if (response) {
    res.send(response);

    return;
  }

  res.sendStatus(404);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    usersService.filterUsersById(userId).length === 0
  ) {
    res.sendStatus(400);

    return;
  }

  lastId++;

  const expense = {
    id: lastId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  res.statusCode = 201;
  res.send(expensesService.create(expense));
}

function deleteExpense(req, res) {
  const id = req.params.id;

  const deletedExpense = expensesService.getOne(id);

  if (deletedExpense) {
    expensesService.deleteOne(deletedExpense.id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateExpense(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (expensesService.filterExpensesById(id).length === 0) {
    res.sendStatus(404);

    return;
  }

  const expenseToUpdate = expensesService.getOne(id);
  const index = expensesService.getIndexOf(expenseToUpdate);
  const newExpense = { ...expenseToUpdate, ...data };

  res.send(expensesService.update(index, newExpense));
}

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
};
