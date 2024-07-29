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
  try {
    const { id } = req.params;
    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    // res.statusCode = 200;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const create = (req, res) => {
  try {
    if (!req.body.name) {
      res.sendStatus(400);

      return;
    }

    const user = userService.create(req.body);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const update = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

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
  try {
    const { id } = req.params;

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
