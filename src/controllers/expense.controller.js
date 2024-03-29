const expensesService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(expensesService.getAll(req.query));
};

const create = (req, res) => {
  const expense = req.body;

  if (!userService.getById(expense.userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (!data) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update(expense, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
