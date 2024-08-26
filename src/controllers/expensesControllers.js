const expensesServices = require('../services/expensesServices');
// const usersServices = require('../services/usersServices');

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
    return res.statusCode(404).send();
  }

  res.sendStatus(200).send(selectedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const isRemove = expensesServices.removeExpense(id);

  if (!isRemove) {
    return res.sendStatus(404).send();
  }

  return res.sendStatus(204).send();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const selectedExpense = expensesServices.getOneExpense(id);

  if (!selectedExpense) {
    return res.sendStatus(404).send();
  }

  const updatedExpense = expensesServices.updateExpense(id, {
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
  // const selectedUser = usersServices.getOneUser(userId);

  if (!spentAt || !title || !amount || !category) {
    return res.status(400).send();
  }

  const newExpense = expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return res.status(201).send(newExpense);
};

module.exports = {
  get,
  getOne,
  remove,
  patch,
  post,
};
