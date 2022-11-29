'use strict';

const { Users } = require('../services/users.js');

class UserController {
  constructor() {
    this.usersService = new Users();

    this.getAll = (req, res) => {
      const users = this.usersService.getAll();

      res.send(users);
    };

    this.getOne = (req, res) => {
      const { id } = req.params;
      const foundUser = this.usersService.getUserById(id);

      if (!foundUser) {
        res.sendStatus(404);

        return;
      }

      res.send(foundUser);

      return foundUser || null;
    };

    this.add = (req, res) => {
      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      const newUser = this.usersService.create(name);

      res.status(201);
      res.send(newUser);
    };

    this.change = (req, res) => {
      const { id } = req.params;
      const foundUser = this.usersService.getUserById(id);

      if (!foundUser) {
        res.sendStatus(404);

        return;
      }

      const { name } = req.body;

      if (typeof name !== 'string') {
        res.sendStatus(422);

        return;
      }

      this.usersService.update(id, name);

      res.send(foundUser);
    };

    this.remove = (req, res) => {
      const { id } = req.params;
      const foundUser = this.usersService.getUserById(id);

      if (!foundUser) {
        res.sendStatus(404);

        return;
      }

      this.usersService.remove(id);
      res.sendStatus(204);
    };
  }
}

module.exports = { UserController };
