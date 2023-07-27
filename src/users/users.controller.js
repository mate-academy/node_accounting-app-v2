'use strict';

const { usersService } = require('./users.service.js');

const usersController = {
  getAll(request, response) {
    const users = usersService.getAll();

    response.status(200).send(users);
  },
  getById(request, response) {
    const { userId } = request.params;
    const foundUser = usersService.getById(Number(userId));

    if (!foundUser) {
      response.sendStatus(404);

      return;
    }

    response.status(200).send(foundUser);
  },
  create(request, response) {
    const { name } = request.body;

    if (!name) {
      response.sendStatus(400);

      return;
    }

    const newUser = usersService.create(name);

    response.statusCode = 201;
    response.send(newUser);
  },
  update(request, response) {
    const { userId } = request.params;
    const { name } = request.body;
    const foundUser = usersService.getById(Number(userId));

    if (!foundUser) {
      response.sendStatus(404);

      return;
    }

    if (!name) {
      response.sendStatus(400);

      return;
    }

    const updatedUser = usersService.update(Number(userId), name);

    response.status(200).send(updatedUser);
  },
  delete(request, response) {
    const { userId } = request.params;
    const foundUser = usersService.getById(Number(userId));

    if (!foundUser) {
      response.sendStatus(404);

      return;
    }

    usersService.delete(Number(userId));

    response.sendStatus(204);
  },
};

module.exports = { usersController };
