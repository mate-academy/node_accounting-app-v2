const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const all = expensesService.getAll(req.query);

  res.status(200).send(all);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send();
  }

  const expense = expensesService.getOneExpense(id);

  if (!expense) {
    return res.status(404).send();
  }

  return res.status(200).send(expense);
};

const deleting = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send();
  }

  const expense = expensesService.getOneExpense(id);

  if (!expense) {
    res.status(404).send();
  }

  expensesService.deletingExpense(id);
  res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const item = expensesService.getOneExpense(id);

  if (!item) {
    return res.status(404).send();
  }

  const updated = expensesService.updateExpense(id, title);

  res.status(200).send(updated);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = usersService.getUser(userId);

  if (!user) {
    res.status(400).send();
  }

  const created = expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(created);
};

module.exports = {
  get,
  getOne,
  deleting,
  update,
  create,
};
