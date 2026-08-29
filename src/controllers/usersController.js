function createUsersController(state) {
  function createUser(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const user = {
      id: state.nextUserId,
      name,
    };

    state.nextUserId += 1;
    state.users.push(user);

    return res.status(201).json(user);
  }

  function getUsers(req, res) {
    return res.status(200).json(state.users);
  }

  function getUser(req, res) {
    const userId = Number(req.params.id);
    const user = state.users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json(user);
  }

  function updateUser(req, res) {
    const userId = Number(req.params.id);
    const user = state.users.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    return res.status(200).json(user);
  }

  function deleteUser(req, res) {
    const userId = Number(req.params.id);
    const userIndex = state.users.findIndex((item) => item.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    state.users.splice(userIndex, 1);

    return res.status(204).send();
  }

  return {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
  };
}

module.exports = {
  createUsersController,
};
