function createUserController(UserService) {
  return {
    getAllUsers: (req, res) => {
      res.statusCode = 200;
      res.send(UserService.getAllUsers());
    },

    createUser: (req, res) => {
      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      res.statusCode = 201;
      res.send(UserService.createUser(name));
    },

    getUserById: (req, res) => {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);

        return;
      }

      const user = UserService.getUserById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.statusCode = 200;
      res.send(user);
    },

    updateUserById: (req, res) => {
      const { id } = req.params;
      const { name } = req.body;

      if (!id || !name) {
        res.sendStatus(400);

        return;
      }

      const user = UserService.updateUserById(id, name);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.statusCode = 200;
      res.send(user);
    },

    deleteUserById: (req, res) => {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);

        return;
      }

      const user = UserService.getUserById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }
      UserService.deleteUserById(id);
      res.statusCode = 204;
      res.end();
    },
  };
}

module.exports = {
  createUserController,
};
