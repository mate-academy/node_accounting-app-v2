const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = expensesService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(result);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const data = expensesService.getById(id);

  if (!data) {
    res.sendStatus(404);

    return;
  }

  res.send(data);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesService.update(id, req.body);

  res.send(newExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
