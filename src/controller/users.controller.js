const { userService } = require('../services/users.service');

const userController = {
  getAll: (req, res) => {
    const users = userService.getAll();

    res.json(users);
  },
  getOne: (req, res) => {
    const user = userService.getById(+req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user);
  },
  create: (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = userService.create(name);

    res.status(201).json(user);
  },

  remove: (req, res) => {
    const userToRemove = userService.getById(+req.params.id);

    if (!userToRemove) {
      return res.sendStatus(404);
    }

    userService.removeById(+req.params.id);

    res.sendStatus(204);
  },
  update: (req, res) => {
    const id = +req.params.id;
    const { name } = req.body;

    const updatedUser = userService.updateById({ id, name });

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    return res.json(updatedUser);
  },
};

module.exports = {
  userController,
};
