'use strict';

function createUsersController(usersService) {
  const getAll = (req, res) => {
    res.json(usersService.getAll());
  };

  const getOne = (req, res) => {
    const user = usersService.getById(+req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(user);
  };

  const create = (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = usersService.create(name);

    res.status(201).json(user);
  };

  const update = (req, res) => {
    const { name } = req.body;
    const user = usersService.getById(+req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = usersService.update(+req.params.id, name);

    res.json(updatedUser);
  };

  const remove = (req, res) => {
    const deletedUser = usersService.remove(+req.params.id);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  };

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
  };
}

module.exports = {
  createUsersController,
};
