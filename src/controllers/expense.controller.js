const exspressService = require('../services/expense.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = exspressService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(result);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const data = exspressService.getById(id);

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
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = exspressService.create({
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

  const expense = exspressService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  exspressService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = exspressService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = exspressService.update(id, req.body);

  res.send(newExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
