const UserService = require('../services/user.service');

module.exports = {
  getAll: (_, res) => {
    res.send(UserService.getAll());
  },

  get: (req, res) => {
    const { id } = req.params;
    const user = UserService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  create: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = UserService.create(name);

    res.status(201).send(newUser);
  },

  edit: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const user = UserService.getById(id);

      if (!user) {
        return res.sendStatus(404);
      }

      if (name !== undefined) {
        UserService.edit(id, name);
        user.name = name;
      }

      return res.send(user);
    } catch (err) {
      return res.status(400);
    }
  },

  remove: (req, res) => {
    const { id } = req.params;

    try {
      UserService.remove(id);
      res.sendStatus(204);
    } catch {
      res.sendStatus(404);
    }

    res.end();
  },
};
