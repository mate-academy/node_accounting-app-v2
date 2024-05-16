const usersService = require('../services/users.service');

const getAll = (req, res) => {
  try {
    const users = usersService.getAll();

    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createUser = (req, res) => {
  try {
    const { name } = req.body;

    const user = usersService.createUser(name);

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserById = (req, res) => {
  try {
    const { id } = req.params;

    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeUser = (req, res) => {
  try {
    const { id } = req.params;

    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    usersService.removeUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    usersService.updateUser(id, body);

    res.status(200).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
