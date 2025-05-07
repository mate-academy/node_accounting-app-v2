const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  return res.status(200).json(users);
};

const getById = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = usersService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(user);
};

const create = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = usersService.create(name);

  res.status(201).json(user);
};

const deleteById = (req, res) => {
  const id = req.params.id;
  const user = usersService.deleteById(id);

  if (user === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(204).send();
};

const update = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!id || !name) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = usersService.update({ id, name });

  if (user === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(user);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
