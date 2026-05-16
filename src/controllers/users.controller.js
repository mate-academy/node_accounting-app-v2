const usersService = require('../services/users.service.js');

const getAll = (req, res) => {
  return res.send(usersService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = usersService.create({ name });

  res.status(201).send(newUser);
};

const getByID = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(numberId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = usersService.deleteById(numberId);

  if (!result) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const userExist = usersService.getById(numberId);

  if (!userExist) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  res.send(usersService.update(numberId, req.body));
};

module.exports = {
  getAll,
  getByID,
  create,
  deleteById,
  update,
};
