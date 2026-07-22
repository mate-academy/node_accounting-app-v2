function createUsersController(usersService) {
  const getAll = (req, res) => {
    const users = usersService.getAllUsers();

    return res.status(200).json(users);
  };

  const create = (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const newUser = usersService.createUser(name);

    return res.status(201).json(newUser);
  };

  const getOne = (req, res) => {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        message: 'Bad request',
      });
    }

    const user = usersService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }

    return res.json(user);
  };

  const remove = (req, res) => {
    const userId = +req.params.id;

    const deleted = usersService.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }

    return res.sendStatus(204);
  };

  const update = (req, res) => {
    const userId = +req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Bad Request',
      });
    }

    const userToUpdate = usersService.updateUser(userId, req.body);

    if (!userToUpdate) {
      return res.status(404).json({
        message: 'Not Found',
      });
    }

    return res.status(200).json(userToUpdate);
  };

  return {
    getAll,
    create,
    getOne,
    remove,
    update,
  };
}

module.exports = {
  createUsersController,
};
