const userService = require('../services/users.service');

const getAll = (req, res) => {
  try {
    const users = userService.getAll();

    res.send(users);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOne = (req, res) => {
  const { id } = req.params;

  try {
    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const create = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = userService.create(req.body);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const update = (req, res) => {
  const { id } = req.params;

  try {
    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = userService.update(id, req.body);

    res.send(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    userService.remove(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
