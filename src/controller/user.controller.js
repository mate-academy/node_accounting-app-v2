const usersService = require('../services/userService');

const userController = {};

userController.get = (req, res) => {
  res.json(usersService.getAll());
};

userController.getOne = (req, res) => {
  const { id } = req.params;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

userController.create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.create(name);

  res.status(201).json(user);
};

userController.update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = usersService.getById(id);

  if (!user) {
    res.sendStatus(404);
  }

  if (!name) {
    res.sendStatus(400);
  }

  const updatedTodo = usersService.update({ id, name });

  res.json(updatedTodo);
};

userController.remove = (req, res) => {
  const { id } = req.params;

  if (!usersService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);

  res.sendStatus(204);
};

module.exports = userController;
