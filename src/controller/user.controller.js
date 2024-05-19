const usersService = require('../services/userService');
const statusCodes = require('../types/statusCode');

const getAll = (req, res) => {
  res.json(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const user = usersService.create(name);

  res.status(statusCodes.CREATED).json(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(statusCodes.NOT_FOUND);
  }

  if (!name) {
    res.sendStatus(statusCodes.BAD_REQUEST);
  }

  const updatedTodo = usersService.update({ id, name });

  res.json(updatedTodo);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  usersService.remove(id);

  res.sendStatus(statusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
