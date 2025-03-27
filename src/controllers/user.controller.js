const userService = require('../services/user.service.js');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({
      error: 'Name is requested',
    });
  }

  const user = userService.create(name);

  if (!user) {
    res.status(422).send({
      error: 'User creation failed',
    });
  } else {
    res.statusCode = 201;
    res.send(user);
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.statusCode = 204;
  res.end();
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const updatedUser = userService.update({ id, name });

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
