const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    res.status(404).send('User with this id not found');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (userHelpers.nameCheck(name)) {
    res
      .status(400)
      .send('Invalid request: "name" is required and must be a string.');

    return;
  }

  const user = userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (userHelpers.isUserExist(id)) {
    res.status(404).send('User with this id not found');

    return;
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (userHelpers.isUserExist(id)) {
    res.status(404).send('User with this id not found');

    return;
  }

  if (userHelpers.nameCheck(name)) {
    res
      .status(400)
      .send('Invalid request: "name" is required and must be a string.');

    return;
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  remove,
  update,
  getOne,
};
