const userServices = require('./../services/user.service');

const get = (req, res) => {
  const users = userServices.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userServices.getOne(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = userServices.getOne(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const existingUser = userServices.getOne(+id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  const user = userServices.updateUser({ id, name });

  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
