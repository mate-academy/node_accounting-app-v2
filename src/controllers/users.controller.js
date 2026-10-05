const userService = require('../services/user.service');

const getAll = (req, res) => {
  return res.json(userService.getAll);
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    return res.status(404).send({ message: 'Not found' });
  }

  return res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const newUser = userService.create();

  res.status(201).json(newUser);
};

const upDate = (req, res) => {
  const { id } = req.params;

  const userUpdate = userService.upDate(id);

  if (!userUpdate) {
    return res.status(404).send({ message: 'Not found' });
  }

  Object.assign(userUpdate, req.body);
  res.json(userUpdate);
};

const deletaById = (req, res) => {
  // const { id } = req.params;
  const index = userService.getById();

  if (index === -1) {
    return res.status(404).send({ message: 'Not found' });
  }

  const newUserDelete = userService.deletaById();

  return res.json(newUserDelete);
};

const resetUser = () => {
  // eslint-disable-next-line no-const-assign
  users = [];
};

const userController = {
  getAll,
  getById,
  create,
  upDate,
  deletaById,
  resetUser,
};

module.exports = {
  userController,
};
