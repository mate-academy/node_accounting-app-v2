const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(expensesService.getAll(req.query));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expense);
};

const create = (req, res) => {
  const data = req.body;

  if (data.userId === undefined) {
    return res.sendStatus(400);
  }

  const user = userService.getOne(data.userId);

  if (!user) {
    return res.sendStatus(400);
  }

  try {
    const newExpense = expensesService.create(data, user);

    res.status(201).send(newExpense);
  } catch (err) {
    return res.sendStatus(400);
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (
    data['userId'] !== undefined &&
    !data['spentAt'] &&
    !data['title'] &&
    !data['amount'] &&
    !data['category'] &&
    !data['note']
  ) {
    return res.sendStatus(400);
  }

  const updatedExpense = expensesService.update(id, data);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = expensesService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
