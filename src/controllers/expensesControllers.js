const expensesServices = require('../services/expensesServices');
const usersServices = require('../services/usersServices');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  return res
    .status(200)
    .send(expensesServices.getExpenses(+userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const selectedExpense = expensesServices.getOneExpense(+id);

  if (!selectedExpense) {
    return res.status(404).send('err');
  }

  return res.status(200).send(selectedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const isFound = expensesServices.getOneExpense(+id);

  if (!isFound) {
    return res.status(404).send();
  }

  expensesServices.removeExpense(+id);

  return res.status(204).send();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const selectedExpense = expensesServices.getOneExpense(+id);

  if (!selectedExpense) {
    return res.status(404).send();
  }

  const updatedExpense = expensesServices.updateExpense(+id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return res.status(200).send(updatedExpense);
};

const post = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const selectedUser = usersServices.getOneUser(+userId);

  if (!spentAt || !title || !amount || !category || !selectedUser) {
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
