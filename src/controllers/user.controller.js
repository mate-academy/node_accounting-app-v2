const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');

const get = async (req, res) => {
  try {
    const users = userService.getUsers();

    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  try {
    if (userHelpers.nameCheck(name, res)) {
      return;
    }

    const newUser = userService.create(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send({ error: 'User not found' });
    }

    userService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (userHelpers.nameCheck(name, res)) {
      return;
    }

    const updatedUser = await userService.update({ id, name });

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
