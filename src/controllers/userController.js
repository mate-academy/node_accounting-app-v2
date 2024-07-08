const userService = require('../services/userService');

module.exports = {
  getAll(_req, res) {
    const users = userService.getAll();

    res.status(200).send(users);
  },
  getOne(req, res) {
    const id = parseInt(req.params.id);

    const user = userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(user);
  },
  create(req, res) {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = userService.create({ name });

    res.status(201).send(user);
  },
  update(req, res) {
    const currentId = parseInt(req.params.id);

    const { name, id } = req.body;

    if (!name && !id) {
      res.sendStatus(400);

      return;
    }

    const foundUser = userService.getById(currentId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = userService.update({ currentId, id, name });

    res.status(200).send(updatedUser);
  },
  remove(req, res) {
    const id = parseInt(req.params.id);

    const foundUser = userService.getById(id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userService.remove(id);

    res.sendStatus(204);
  },
};
