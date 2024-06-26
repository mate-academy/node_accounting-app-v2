const {
  getAllUsers,
  addUserByName,
  getUserById,
  removeUserById,
  updateUserById,
} = require('../services/users.service');

const getUsers = (req, res) => {
  try {
    res.status(200).send(getAllUsers());
  } catch (err) {
    return res.status(500).send('An error occurred while creating expense.');
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  try {
    const user = addUserByName(name);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send('An error occurred while creating user.');
  }
};

const getCurrentUser = (req, res) => {
  const { id } = req.params;

  try {
    const currentUser = getUserById(id);

    return res.status(200).send(currentUser);
  } catch (err) {
    return res.status(500).send('An error occurred while fetching user.');
  }
};

const removeCurrentUser = (req, res) => {
  try {
    const { id } = req.params;

    removeUserById(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send('An error occurred while deleting user.');
  }
};

const updateCurrentUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const currentUser = getUserById(id);

    updateUserById(currentUser, name);

    return res.send(currentUser);
  } catch (err) {
    return res.status(500).send('An error occurred while updating user.');
  }
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
};
