const userServices = require('../services/userServices.js');

const listAllUsers = (req, res) => {
  try {
    const users = userServices.getAll();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getUser = (req, res) => {
  const { id } = req.params;

  try {
    const user = userServices.getUserById(id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required!');
  }

  try {
    const newUser = userServices.createUser(name);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  try {
    const userToRemove = userServices.deleteUserById(Number(id));

    if (!userToRemove) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, spentAt, title, amount, category, note } = req.body;

  if (!id || !name) {
    return res.sendStatus(400);
  }

  try {
    const userToUpdate = userServices.updateUserById({
      id: Number(id),
      name,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    if (!userToUpdate) {
      return res.sendStatus(404);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(userToUpdate);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  listAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
