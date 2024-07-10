const userService = require('./../services/users.service');

const getAllUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();

    res.send(users);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOneUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeUser = (req, res) => {
  try {
    const { id } = req.params;

    const user = userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    userService.removeUserById(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const addUser = (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = userService.createUserByName(name);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = userService.updateUserData({ id, name });

    res.send(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  removeUser,
  addUser,
  updateUser,
};
