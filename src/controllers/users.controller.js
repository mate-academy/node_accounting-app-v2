const { usersService } = require('./../services/users.service');

const getAll = (req, res) => {
  res.status(200).json(usersService.getAll());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = usersService.create(name);

  res.status(201).json(user);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;
  const user = usersService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteById(+userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = usersService.update({ id: +userId, name });

  res.status(200).json(updatedUser);
};

const usersController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

module.exports = {
  usersController,
};
