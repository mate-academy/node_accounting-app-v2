'use strict';

const Express = require('express'); // eslint-disable-line
const usersService = require('../services/users.service');

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};

/* eslint no-console: "warn" */

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function get(req, res) {
  console.info('\napp.get(\'/users\')\n');

  res.status(200).send(usersService.getAll());
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function getById(req, res) {
  console.info(`\napp.get('/users:id=${req.params.id}')\n`);

  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400).send('Required params { id: number }');

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200).send(user);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function create(req, res) {
  console.info(`\napp.post('/users\n`);

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).send('Required params { name: string }');

    return;
  }

  const user = usersService.create(name);

  res.status(201).send(user);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function remove(req, res) {
  console.info(`\napp.delete('/users:id=${req.params.id}'\n`);

  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400).send('Required params { id: number }');

    return;
  }

  const users = usersService.removeById(id);

  if (!users) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(204).send(String(id));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function update(req, res) {
  console.info(`\napp.patch('/users:id=${req.params.id}'\n`);

  const id = +req.params.id;
  const { name } = req.body;

  if (!Number.isInteger(id)
    || typeof name !== 'string') {
    res.status(400)
      .send('Required params { id: number } body { name: string }');

    return;
  }

  const user = usersService.update({
    id: +id,
    name,
  });

  if (!user) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200).send(user);
}
