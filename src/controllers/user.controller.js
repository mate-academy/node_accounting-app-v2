const usersService = require('../services/users.service');

const get = (req, res) => {
  res.status(200).send(usersService.getAll());
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'This id was not found' });
  }

  res.status(200).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message:
        'the server could not understand the request due to invalid syntax',
    });
  }

  const user = usersService.create(name);

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    return res.sendStatus(404);
  }

  usersService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!usersService.getById(id)) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.send(400).json({
      message:
        'the server could not understand the request due to invalid syntax',
    });
  }

  const updated = usersService.update({ id, name });

  res.status(200).send(updated);
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
