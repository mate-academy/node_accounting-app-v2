const usersService = require('../services/usersService');

function getAll(req, res) {
  res.json(usersService.getAll());
}

function getById(req, res) {
  const user = usersService.getById(req.params.id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).end();
  }

  const user = usersService.create(name);

  res.status(201).json(user);
}

function update(req, res) {
  const updated = usersService.update(req.params.id, req.body.name);

  if (!updated) {
    return res.status(404).end();
  }
  res.json(updated);
}

function remove(req, res) {
  const deleted = usersService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }
  res.status(204).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
