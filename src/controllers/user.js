const { userService } = require('../service');

const create = (req, res) => {
  const newRecord = userService.create(req.body);

  if (!newRecord) {
    return res.sendStatus(400);
  }

  res.status(201).send(newRecord);
};

const getAll = (req, res) => {
  const data = userService.getAll();

  res.send(data);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = userService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  res.send(record);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = userService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  userService.remove(+id);

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = userService.getById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updated = userService.update(+id, name);

  res.send(updated);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
