const {
  getAll,
  getById,
  update,
  create,
  remove,
} = require('../services/usersService');

const getAllUsers = async (req, res) => {
  await res.send(getAll());
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await getById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.send(user);
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Missing required fields');
  }

  const user = await create(name);

  res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = await getById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await update({
    id,
    name,
  });

  res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  const user = await getById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  await remove(id);

  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
