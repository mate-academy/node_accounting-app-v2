const userService = require('../services/users.service.js');

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

    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const createUser = (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = userService.createUser(req.body);

    res.statusCode = 201;
    res.send(newUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  try {
    const updatedUser = userService.updateUser(id, req.body);

    res.send(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeUser = (req, res) => {
  const { id } = req.params;

  try {
    const user = userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    userService.removeUser(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
