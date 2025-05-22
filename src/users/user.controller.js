const service = require('./user.service');

const getAll = (req, res) => {
  res.send(service.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;

  const user = service.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = service.add({ name });

  res.status(201).send(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const updatedUser = service.update(id, { name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedUser);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const deletedUser = service.deleteById(id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
