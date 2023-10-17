'use strict';

const usersService = require('../services/usersService');

const get = async(req, res) => {
  res.status(200).json(usersService.getAll());
};

const post = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).end();

    return;
  }

  res.status(201).json(usersService.addUser(name));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    res.status(400).end();

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.status(404).end();

    return;
  }

  res.status(200).json(user);
};

const deleteOne = async(req, res) => {
  const { id } = req.params;

  if (!usersService.deleteById(+id)) {
    res.status(404).end();

    return;
  }

  res.status(204).end();
};

const patchOne = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || Number.isNaN(+id)) {
    res.status(400).end();

    return;
  }

  // eslint-disable-next-line object-curly-newline
  const user = usersService.updateById({ id: +id, name });

  if (!user) {
    res.status(404).end();

    return;
  }

  res.status(200).json(user);
};

module.exports = {
  get,
  post,
  getOne,
  deleteOne,
  patchOne,
};
