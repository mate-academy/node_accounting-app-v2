'use strict';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  isValidId(id) {
    return Number.isInteger(id) && id > 0;
  }

  getAllUsers(req, res) {
    const users = this.userService.getAllUsers();

    res.json(users);
  }

  createUser(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Bad request');
    }

    const user = this.userService.createUser(name);

    res.status(201).json(user);
  }

  getUserById(req, res) {
    const id = Number(req.params.id);

    if (!this.isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const user = this.userService.getUserById(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.json(user);
  }

  updateUser(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!this.isValidId(id) || !name) {
      return res.status(400).send('Bad request');
    }

    const user = this.userService.updateUser(id, name);

    if (!user) {
      return res.status(404).send('Not found');
    }

    res.json(user);
  }

  deleteUser(req, res) {
    const id = Number(req.params.id);

    if (!this.isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const deleted = this.userService.deleteUser(id);

    if (!deleted) {
      return res.status(404).send('Not found');
    }

    res.sendStatus(204);
  }
}

module.exports = UserController;
