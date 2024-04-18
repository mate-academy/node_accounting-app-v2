/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const UserService = require('../services/User.Service');

const get = async(request, response) => {
  try {
    const allUsers = await UserService.getAll();

    if (!allUsers) {
      response.status(404).send('Not Found: The specified entity does not exist');
    }

    response.statusCode = 200;
    response.send(allUsers);
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

const getOne = async(request, response) => {
  try {
    const { id } = request.params;
    const user = await UserService.getOne(id);

    if (user === null) {
      response.sendStatus(404);

      return;
    };

    response.statusCode = 200;
    response.send(user);
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

const create = async(request, response) => {
  try {
    const { name } = request.body;
    const createdUser = await UserService.create(name);

    if (createdUser === null) {
      response.sendStatus(400);

      return;
    }

    response.statusCode = 201;
    response.send(createdUser);
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

const update = async(request, response) => {
  try {
    const { id } = request.params;
    const updatedUser = await UserService.update(request.body.name, id);

    if (typeof updatedUser === 'number') {
      // There's 400 or 404 status code if updatedUser has type number
      response.sendStatus(updatedUser);

      return;
    }

    response.statusCode = 200;
    response.send(updatedUser);
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

const remove = async(request, response) => {
  try {
    const { id } = request.params;
    const userIsDeleted = await UserService.deleteById(id);

    response.sendStatus(userIsDeleted ? 204 : 404);
  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
