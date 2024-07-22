const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const get = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.send(expenseService.getAll());

    return;
  }

  const { userId, categories, from, to } = req.query;

  const expenses = expenseService.getFiltered({
    userId,
    categories: categories ? categories.split(',') : [],
    from,
    to,
  });

  res.send(expenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    !userService.getById(userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const getOne = (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const id = +req.params.id;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const id = +req.params.id;
  const { spentAt, title, amount, category, note } = req.body;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedexpense = expenseService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedexpense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
