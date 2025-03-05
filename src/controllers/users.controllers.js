const usersServiсe = require('../services/users.service');

const getAllUsers = (req, res) => {
  res.status(200).send(usersServiсe.getAllUsers());
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  if (typeof +id !== 'number') {
    res.status(400).send('Write correct data');

    return;
  }

  const user = usersServiсe.getOne(+id);

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Write correct data');

    return;
  }

  const user = usersServiсe.create(name);

  res.status(201).send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!usersServiсe.getOne(+id)) {
    res.status(404).send('Not found');

    return;
  }

  usersServiсe.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (usersServiсe.getOne(+id) === null) {
    res.status(404).send('Not found');

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send('Write correct data');

    return;
  }

  const updatedUser = usersServiсe.updateUser({ id, name });

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
