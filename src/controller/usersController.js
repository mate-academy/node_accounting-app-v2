'use strict';

const { usersService } = require('../services/users');

class UsersController {
  postUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      res.json({ error: 'name is not passed' });

      return;
    }

    const user = usersService.createUser(name);

    res.statusCode = 201;
    res.json(user);
  }

  getUsers(req, res) {
    const data = usersService.getAll();

    res.statusCode = 200;
    res.json(data);
  };

  getUser(req, res) {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.statusCode = 400;
      res.json({ error: 'request parameter is not valid, expected number' });

      return;
    }

    const userData = usersService.getOne(userId);

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

    const hasDeleted = usersService.removeOne(userId);

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
      ? 'name is not passed'
      : 'request parameter is not valid, expected number';

    if (!name || isNaN(+userId)) {
      res.status(400);
      res.json({ error });

      return;
    }

    const data = usersService.modifyUser(userId, name);

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
