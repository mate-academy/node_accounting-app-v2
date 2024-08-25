const expensesServices = require('../services/expensesServices');
const usersSerwices = require('../services/usersServices');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  return res
    .status(200)
    .send(expensesServices.getExpenses(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const selectedExpense = expensesServices.getOneExpense(id);

  if (!selectedExpense) {
    return res.statusCode(404);
  }

  res.sendStatus(200).send(selectedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const selectedExpense = expensesServices.removeExpense(id);

  if (!selectedExpense) {
    return res.sendStatus(404).send();
  }

  return res.sendStatus(204).send();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const selectedExpense = expensesServices.getOneExpense(id);

  if (!selectedExpense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesServices.removeExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return res.sendStatus(204).send(updatedExpense);
};

const post = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const selectedUser = usersSerwices.getOneUser(userId);

  if (!spentAt || !title || !amount || !category || !selectedUser) {
    return res.sendStatus(400);
  }

  const newExpense = expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return res.sendStatus(201).send(newExpense);
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
