const expenseService = require('../services/expense.service');

const getAll = (req, res, next) => {
  const userId = req.query.userId ? Number(req.query.userId) : undefined;
  const categories = req.query.categories
    ? Array.isArray(req.query.categories)
      ? req.query.categories
      : [req.query.categories]
    : undefined;
  const { from, to } = req.query;

  const filter = {
    userId,
    from,
    to,
    categories,
  };

  const expenses = expenseService.getAll(filter);

  res.status(200).json(expenses);
};

const getById = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.getById(id);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

const create = (req, res, next) => {
  try {
    const { spentAt, title, amount, category, note } = req.body;
    const userId = Number(req.body.userId);

    if (!userId || !title || !amount || !spentAt || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const data = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const createdExpense = expenseService.create(data);

    res.status(201).json(createdExpense);
  } catch (error) {
    res.sendStatus(error.statusCode);
  }
};

const update = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    const data = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const createdUser = expenseService.update(id, data);

    res.status(200).json(createdUser);
  } catch (error) {
    res.sendStatus(404);
  }
};

const remove = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    expenseService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
