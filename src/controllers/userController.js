const userService = require('../services/userService');

class UserController {
  getAll = (req, res) => {
    res.send(userService.getAll());
  };

  getById = (req, res) => {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  };

  create = (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  };

  update = (req, res) => {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = userService.update(id, { name });

    res.send(updatedUser);
  };

  delete = (req, res) => {
    const id = Number(req.params.id);

    if (!userService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    userService.delete(id);

    res.sendStatus(204);
  };
}

module.exports = new UserController();
