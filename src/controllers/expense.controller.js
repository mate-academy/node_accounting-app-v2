const expensesService = require('../services/expense.service.js');
const userService = require('../services/user.service');

const getExpenses = (req, res) => {
  const options = {
    from: req.query.from || null,
    to: req.query.to || null,
    userId: +req.query.userId || null,
    categories: req.query.categories || null,
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(expensesService.getAll(options));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.send(expense);
};

const create = (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userService.getById(+userId)) {
    res.sendStatus(400);
  }

  const expense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedTodo = expensesService.update({ id, body });

  res.send(updatedTodo);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(+id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  create,
  getOne,
  deleteExpense,
  update,
};
