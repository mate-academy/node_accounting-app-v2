'use strict';

const usersService = require('../services/usersService');
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  SUCCESS,
  NO_CONTENT,
} = require('../utils/statusCodes');

const getAll = async(req, res) => {
  res.status(SUCCESS).json(usersService.getAll());
};

const post = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(BAD_REQUEST).end();

    return;
  }

  res.status(CREATED).json(usersService.addUser(name));
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    res.status(BAD_REQUEST).end();

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(SUCCESS).json(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!usersService.deleteById(+id)) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(NO_CONTENT).end();
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || Number.isNaN(+id)) {
    res.status(BAD_REQUEST).end();

    return;
  }

  const user = usersService.updateById({
    id: +id,
    name,
  });

  if (!user) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(SUCCESS).json(user);
};

module.exports = {
  getAll,
  post,
  getById,
  remove,
  update,
};
