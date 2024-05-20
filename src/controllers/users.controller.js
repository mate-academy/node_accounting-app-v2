const usersService = require('../services/users.service');
const { HTTP_STATUS } = require('../consts');
const getAll = async (req, res) => {
  res.send(usersService.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

    return;
  }

  res.statusCode = HTTP_STATUS.CREATED;
  res.send(usersService.create(req.body));
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(HTTP_STATUS.BAD_REQUEST);

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.statusCode = HTTP_STATUS.OK;
  res.send(usersService.update(id, req.body));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND);

    return;
  }

  res.statusCode = HTTP_STATUS.NO_CONTENT;
  res.send(usersService.remove(user.id));
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
