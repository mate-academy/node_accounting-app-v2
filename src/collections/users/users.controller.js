'use strict';

const {
  isStr: isExistAndString,
  isNum: isExistAndNumber,
} = require('../../helpers/isExistAndType');
const usersService = require('./users.service');

function getAll(_, response) {
  response.send(usersService.getAll());
}

function getOne(request, response) {
  const { id } = request.params;
  const normalizedId = Number(id);

  if (!isExistAndNumber(normalizedId)) {
    response.sendStatus(404);

    return;
  }

  const user = usersService.getOne(normalizedId);

  if (!user) {
    response.sendStatus(404);

    return;
  }

  response.send(user);
}

function add(request, response) {
  const { name } = request.body;

  if (!isExistAndString(name)) {
    response.sendStatus(400);

    return;
  }

  const newUser = usersService.add({ name });

  response.status(201).send(newUser);
}

function remove(request, response) {
  const { id } = request.params;
  const normalizedId = Number(id);

  if (!isExistAndNumber(normalizedId)) {
    return response.sendStatus(404);
  }

  const isRemoved = usersService.remove(normalizedId);

  if (!isRemoved) {
    response.sendStatus(404);

    return;
  }

  response.sendStatus(204);
}

function update(request, response) {
  const { id } = request.params;
  const { name } = request.body;
  const normalizedId = Number(id);

  if (!isExistAndNumber(normalizedId)) {
    response.sendStatus(404);

    return;
  }

  if (!isExistAndString(name)) {
    response.sendStatus(400);

    return;
  }

  const updatedUser = { id: normalizedId, name };

  const isUpdated = usersService.update(updatedUser);

  if (!isUpdated) {
    response.sendStatus(404);

    return;
  }

  response.send(updatedUser);
}

module.exports = { getAll, getOne, add, remove, update };
