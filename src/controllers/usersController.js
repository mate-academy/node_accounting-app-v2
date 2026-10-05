const createUsersController = (usersService) => {
  const getUsers = (req, res) => {
    const users = usersService.findUsers();

    res.json(users);
  };

  const getUserById = (req, res) => {
    const id = req.params.id;
    const users = usersService.findUserById(id);

    if (!users) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(users);
    }
  };

  const postUser = (req, res) => {
    const newUser = req.body;

    if (!req.body.name) {
      res.status(400);
      res.end();
    } else {
      const user = usersService.createUser(newUser);

      res.status(201);
      res.json(user);
    }
  };

  const patchUser = (req, res) => {
    const id = req.params.id;
    const user = usersService.patchUserById(id, req.body);

    if (!user) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(user);
    }
  };

  const deleteUser = (req, res) => {
    const id = req.params.id;
    const user = usersService.deleteUserById(id);

    if (!user) {
      res.status(404);
      res.end();
    } else {
      res.status(204).end();
    }
  };

  return {
    getUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser,
  };
};

module.exports = {
  createUsersController,
};
