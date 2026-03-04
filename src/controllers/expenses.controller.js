const expensesServise = require('../services/expenses.service.js');
const userServise = require('../services/user.service.js');

const get = (req, res) => {
  let expenses = expensesServise.getAll();

  const { userId, categories, from, to } = req.query;

  if (userId) {
    expenses = expenses.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const cats = categories.split(',');

    expenses = expenses.filter((e) => cats.includes(e.category));
  }

  if (from) {
    expenses = expenses.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    expenses = expenses.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesServise.getById(id);

  if (!expense) {
    res.status(404).send();

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = userServise.getById(userId);

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    typeof amount !== 'number' ||
    amount < 1 ||
    !category ||
    !user
  ) {
    res.status(400).send();

    return;
  }

  const expense = expensesServise.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const existingExpense = expensesServise.getById(id);

  if (!existingExpense) {
    return res.status(404).send();
  }

  if (
    'amount' in req.body &&
    (typeof req.body.amount !== 'number' || req.body.amount < 1)
  ) {
    return res.status(400).send();
  }

  const updatedExpense = expensesServise.update({
    id,
    ...req.body,
  });

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServise.getById(id)) {
    res.status(404).send();

    return;
  }

  expensesServise.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
