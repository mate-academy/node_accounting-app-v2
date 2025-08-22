const userService = require('../services/userService');

class UserController {
  getAll = (req, res) => {
    res.send(userService.getAll());
  };

  getById = (req, res) => {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(user);
  };

  create = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    const newUser = userService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  };

  update = (req, res) => {
    const id = Number(req.params.id);
    const user = userService.getById(id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send({ message: 'Name is required' });
    }

    const updatedUser = userService.update(id, { name });

    res.send(updatedUser);
  };

  delete = (req, res) => {
    const id = Number(req.params.id);

    if (!userService.getById(id)) {
      return res.status(404).send({ message: 'User not found' });
    }

    userService.delete(id);

    res.sendStatus(204);
  };
}

module.exports = new UserController();
