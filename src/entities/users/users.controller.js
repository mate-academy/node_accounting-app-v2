const createUserController = (userService) => {
  const {
    getUserByID,
    createUser,
    deleteUser: deleteUserByID,
    getAllUser,
    updateUser,
  } = userService;

  const getOne = (req, res) => {
    const user = getUserByID(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).json(user);
  };

  const getAll = (req, res) => {
    res.send(getAllUser());
  };

  const create = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    res.status(201).send(createUser(name));
  };

  const deleteUser = (req, res) => {
    const user = getUserByID(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    deleteUserByID(Number(req.params.id));

    res.sendStatus(204);
  };

  const update = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = updateUser(Number(req.params.id), name);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  };

  return {
    getOne,
    getAll,
    create,
    deleteUser,
    update,
  };
};

module.exports = createUserController;
