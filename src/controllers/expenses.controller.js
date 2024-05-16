const ExpensesService = require('../services/expenses.service');
const UsersService = require('../services/user.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filterExpenses = ExpensesService.getAll(userId, categories, from, to);

  res.status(200).send(filterExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = ExpensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = UsersService.getById(userId);

  if (!user || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = ExpensesService.create(
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
  const expense = ExpensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  ExpensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = ExpensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = ExpensesService.update(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
