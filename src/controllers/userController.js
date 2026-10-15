const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.status(200).json(users);
};

const getById = (req, res) => {
  const user = userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const create = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create({ name });

  res.status(201).json(user);
};

const remove = (req, res) => {
  const user = userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const expenses = expenseService.getAll();
  const userExpenses = expenses.filter((e) => e.userId === user.id);

  userExpenses.forEach((e) => {
    expenseService.remove(e.id);
  });

  userService.remove(user.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const user = userService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.update({
    id: user.id,
    name: req.body.name !== undefined ? req.body.name : user.name,
  });

  res.status(200).json(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
