const expensesService = require('../service/expenses');
const userService = require('../service/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(200).send(expenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  const expense = expensesService.getById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = userService.getById(userId);

  if (!user || !userId || !spentAt || !title || !amount
    || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  const expense = expensesService.getById(expenseIdNumber);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(
    expenseIdNumber,
    req.body,
  );

  res.status(200).send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  const expense = expensesService.getById(expenseIdNumber);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseIdNumber);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
