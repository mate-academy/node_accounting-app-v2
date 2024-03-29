const expenseServise = require('../services/expense.servise.js');
const userServise = require('../services/user.service.js');

const getAll = (req, res) => {
  res.send(expenseServise.getAll(req.query));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServise.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const expense = req.body;
  const user = userServise.getOne(expense.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServise.create(expense);

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const wasDeleted = expenseServise.remove(id);

  if (!wasDeleted) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expenseServise.update(id, req.body);

  if (expense === 'Wrong body') {
    res.sendStatus(400);

    return;
  }

  if (expense === 'Not found') {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
