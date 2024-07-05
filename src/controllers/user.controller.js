const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/user.service');

const get = (req, res) => {
  res.send(getAll());
};

const getByIdController = (req, res) => {
  const { id } = req.params;
  const user = getById(id);

  if (!user) {
    res.status(404).send({ message: 'User not found' });

    return;
  }
  res.send(user);
};

const createController = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  const user = create(name);

  res.status(201).send(user);
};

const removeController = (req, res) => {
  const { id } = req.params;
  const success = remove(id);

  if (!success) {
    res.status(404).send({ message: 'User not found' });

    return;
  }
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates.name && updates.name !== '') {
    res.status(400).send({ message: 'Name is required' });

    return;
  }

  const user = update(id, updates);

  if (!user) {
    res.status(404).send({ message: 'User not found' });

    return;
  }
  res.send(user);
};

module.exports = {
  get,
  getById: getByIdController,
  create: createController,
  remove: removeController,
  update: updateController,
};
