const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filteredExpenses = expensesService.getFilteredExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const userExp = expensesService.getExpById(id);

  if (!userExp) {
    res.sendStatus(404);

    return;
  }

  res.send(userExp);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const expense = expensesService.getExpById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExp = expensesService.update({ id, title });

  res.send(updatedExp);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
