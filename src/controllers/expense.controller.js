const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const get = (req, res) => {
  const expenses = expenseService.get(req.query);

  res.status(200).send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const expenseData = req.body;

  if (!expenseData.title || !userService.getById(expenseData.userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(expenseData);

  res.status(201).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const elements = ['spentAt', 'title', 'amount', 'category', 'note'];
  const values = {};

  elements.forEach((el) => {
    const value = req.body[el];

    if (value) {
      values[el] = value;
    }
  });

  const newExpense = expenseService.update(expense, values);

  res.status(200).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
