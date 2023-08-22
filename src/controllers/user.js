'use strict';

const userServices = require('../services/users');

const getAll = (request, response) => {
  const query = request.query;
  const users = userServices.getUsers(query);

  response.send(users);
};

const getOne = (request, response) => {
  const { userId } = request.params;
  const user = userServices.getUser(userId);

  if (!user) {
    response.statusCode = 404;
    response.send('Not Found');

    return;
  }

  response.statusCode = 200;
  response.send(user);
};

const add = (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.statusCode = 400;
    response.send('Please, enter a name');

    return;
  }

  const newUser = userServices.createUser({
    name,
  });

  response.statusCode = 201;
  response.send(newUser);
};

const update = (request, response) => {
  const { userId } = request.params;
  const user = userServices.getUser(userId);

  if (!user) {
    response.statusCode = 404;
    response.send('User not found');

    return;
  }

  const { name } = request.body;

  const updatedUser = userServices.updateUser(userId, name);

  response.send(updatedUser);
};

const remove = (request, response) => {
  const { userId } = request.params;
  const user = userServices.getUser(userId);

  if (!user) {
    response.statusCode = 404;
    response.send('Not Found');

    return;
  }

  userServices.deleteUser(userId);

  response.statusCode = 204;
  response.send();
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
