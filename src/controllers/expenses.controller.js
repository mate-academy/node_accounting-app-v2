const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const checkId = (req, res, next, value) => {
  if (!value) {
    res.status(400).send();

    return;
  }

  const expense = expensesService.getOneExpense(value);

  if (!expense) {
    res.status(404).send();

    return;
  }

  req.check = expense;
  next();
};

const get = (req, res) => {
  const all = expensesService.getAll(req.query);

  res.status(200).send(all);
};

const getOne = (req, res) => {
  return res.status(200).send(req.check);
};

const deleting = (req, res) => {
  expensesService.deletingExpense(req.check.id);
  res.status(204).send();
};

const patch = (req, res) => {
  const { title } = req.body;

  if (title) {
    const updated = expensesService.updateExpense(req.check.id, title);

    res.status(200).send(updated);
  }
};

const post = (req, res) => {
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
  patch,
  post,
  checkId,
};
