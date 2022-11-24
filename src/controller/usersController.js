'use strict';

const { UsersService } = require('../services/users');

class UsersController extends UsersService {
  constructor(users) {
    super(users);

    this.createUser = this.createUser.bind(this);
    this.postUser = this.postUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getOne = this.getOne.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.patchUser = this.patchUser.bind(this);
    this.modifyUser = this.modifyUser.bind(this);
  }

  postUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      res.json({ error: 'required parameter is not passed' });

      return;
    }

    const user = super.createUser(name);

    this.users.push(user);

    res.statusCode = 201;
    res.json(user);
  }

  getUsers(req, res) {
    const data = super.getAll();

    res.statusCode = 200;
    res.json(data);
  };

  getUser(req, res) {
    const { userId } = req.params;

    if (isNaN(userId)) {
      res.statusCode = 400;
      res.json({ error: 'required parameter is not valid, expected number' });

      return;
    }

    const userData = super.getOne(userId);

    if (!userData) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    res.statusCode = 200;
    res.json(userData);
  };

  removeUser(req, res) {
    const { userId } = req.params;

    const hasDeleted = super.removeOne(userId);

    if (!hasDeleted) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    res.sendStatus(204);
  };

  patchUser(req, res) {
    const { userId } = req.params;
    const { name } = req.body;

    const error = !name
      ? 'required parameter is not passed'
      : 'required parameter is not valid, expected number';

    if (!name || isNaN(userId)) {
      res.status(400);
      res.json({ error });

      return;
    }

    const data = super.modifyUser(userId, name);

    if (!data) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    res.statusCode = 200;
    res.json(data);
  };
}

const usersController = new UsersController([]);

module.exports = {
  usersController,
};
