const status = require('../constants');
const userService = require('../services/users.service');

const getAll = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = userService.createOne({ name });

  res.status(status.CREATED).send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = userService.updateOne(id, { name });

  if (!user) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = userService.deleteOne(id);

  if (!deleted) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
