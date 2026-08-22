const { expensesService } = require('../service/expenses.service');

const getAll = async (req, res) => {
  const users = await expensesService.getAll();

  res.json(users);
};

const getById = async (req, res) => {
  const user = await expensesService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = expensesService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const deletedUser = await expensesService.remove(+req.params.id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const changeOne = async (req, res) => {
  const name = req.body.name;
  const user = await expensesService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = expensesService.change(+req.params.id, name);

  res.json(updatedUser);
};

const expensesController = {
  getAll,
  getById,
  create,
  deleteOne,
  changeOne,
};

module.exports = {
  expensesController,
};
