const service = require('../services/users.service.js');

const getAll = (req, res) => {
  return res.send(service.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = service.create(name);

  res.status(201).send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const user = service.getById(numberId);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = service.deleteById(numberId);

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

  const userExist = service.getById(numberId);

  if (!userExist) {
    return res.sendStatus(404);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  res.send(service.update(numberId, req.body));
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
