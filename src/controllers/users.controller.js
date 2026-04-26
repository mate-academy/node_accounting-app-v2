/* eslint-disable curly */
'use strict';

const { usersService } = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) return res.sendStatus(404);

  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) return res.sendStatus(400);

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) return res.sendStatus(404);

  await usersService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const body = req.body || {};
  const filteredBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => Boolean(value)),
  );

  const user = await usersService.getById(req.params.id);

  if (!user) return res.sendStatus(404);

  const updatedUser = await usersService.update({
    ...filteredBody,
    id: req.params.id,
  });

  res.json(updatedUser);
};

module.exports = {
  usersController: {
    getAll,
    getOne,
    create,
    deleteOne,
    update,
  },
};
