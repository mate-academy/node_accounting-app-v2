const usersService = require('../services/users.service');
const HTTP_STATUS_CODES = require('../variables/httpStatusCodes');

const getAll = (req, res) => {
  res.send(usersService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
  }

  const user = usersService.create(name);

  res.statusCode = HTTP_STATUS_CODES.CREATED;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    return;
  }

  const updatedUser = usersService.update(id, name);

  res.statusCode = HTTP_STATUS_CODES.OK;

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  usersService.remove(id);
  res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
