const { userService } = require('../services/users.service');

const usersController = {
  getAll: (req, res) => {
    const users = userService.getAll();

    res.send(users);
  },

  getOne: (req, res) => {
    const user = userService.getUserById(+req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  create: (req, res) => {
    const name = req.body.name;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = userService.create(name);

    res.status(201).send(user);
  },

  remove: (req, res) => {
    const user = userService.getUserById(+req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    userService.remove(+req.params.id);
    res.sendStatus(204);
  },

  update: (req, res) => {
    const id = +req.params.id;
    const { name } = req.body;

    const user = userService.update({ id, name });

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },
};

module.exports = {
  usersController,
};
