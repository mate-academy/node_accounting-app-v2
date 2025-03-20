const usersService = require('../services/users.service');
const expensesService = require('../services/expenses.service');

const getAll = (req, res) => {
  let { userId, categories, from, to } = req.query;

  if (userId) {
    userId = +userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }
  }

  if (categories && !Array.isArray(categories)) {
    categories = [categories];
  }

  if (from) {
    from = new Date(from);

    if (isNaN(from.getTime())) {
      res.sendStatus(400);

      return;
    }
  }

  if (to) {
    to = new Date(to);

    if (isNaN(to.getTime())) {
      res.sendStatus(400);

      return;
    }
  }

  res.send(expensesService.getAll(userId, categories, from, to));
};

const getOne = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = expensesService.remove(id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const create = (req, res) => {
  const userId = +req.body.userId;
  const amount = +req.body.amount;
  const { spentAt, title, category, note } = req.body;

  if (
    isNaN(userId) ||
    isNaN(amount) ||
    !spentAt ||
    isNaN(new Date(spentAt).getTime()) ||
    !title ||
    !category ||
    !note ||
    usersService.getById(userId) === undefined
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(
    expensesService.create(userId, spentAt, title, amount, category, note),
  );
};

const update = (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  let { userId, amount } = req.body;
  const { spentAt, title, category, note } = req.body;

  if (userId) {
    userId = +userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }
  }

  if (amount) {
    amount = +amount;

    if (isNaN(amount)) {
      res.sendStatus(400);

      return;
    }
  }

  if (spentAt && isNaN(new Date(spentAt).getTime())) {
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

  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined),
  );

  const expense = expensesService.update(id, cleanedData);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
