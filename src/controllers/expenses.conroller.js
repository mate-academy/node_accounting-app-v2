const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  res.send(expensesService.getAll(req.query));
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(String(userId));

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expenses = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expenses = expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expenses = expensesService.getById(id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpenses = expensesService.update(id, dataToUpdate);

  res.send(updatedExpenses);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
