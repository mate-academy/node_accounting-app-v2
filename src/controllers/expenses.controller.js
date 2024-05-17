const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const { from, to, userId, categories } = req.query;

  res.send(
    expensesService.getAll({
      from,
      to,
      userId,
      categories,
    }),
  );
};

const getById = async (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  if (!userId || !title || !amount || !category || !spentAt) {
    res.sendStatus(400);

    return;
  }

  if (!usersService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(
    expensesService.create({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    }),
  );
};

const update = async (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(
    expensesService.update({
      id,
      newExpense,
    }),
  );
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 204;
  res.send(expensesService.remove(id));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
