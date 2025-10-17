module.exports = (usersService) => ({
  getAll() {
    return async (req, res) => {
      try {
        const users = usersService.get();

        res.status(200).json(users);
      } catch (err) {
        res.status(400).send('Bad Request');
      }
    };
  },

  getByUserId() {
    return (req, res) => {
      const { id } = req.params;
      const numericId = Number(id);

      const user = usersService.getById(numericId);

      if (!user) {
        res.status(404).send('file not exist');

        return;
      }

      res.status(200).json(user);
    };
  },

  addUser() {
    return (req, res) => {
      const { name } = req.body;

      try {
        const newUser = usersService.addUser(name);

        if (!newUser) {
          return res.status(409).send('User already exists');
        }

        res.status(201).json(newUser);
      } catch (err) {
        res.status(404).send('user not added!');
      }
    };
  },

  updatedUser() {
    return (req, res) => {
      const { id } = req.params;
      const numericId = Number(id);
      const { name } = req.body;

      try {
        const updatedUser = usersService.updateUser(numericId, name);

        if (!updatedUser) {
          return res.status(400).send('user for update not found');
        }
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).send('Internal server error');
      }
    };
  },

  deleteUser() {
    return (req, res) => {
      const { id } = req.params;
      const numericId = Number(id);

      try {
        const result = usersService.deleteUser(numericId);

        if (!result) {
          return res.status(404).send('user not exist');
        }

        res.status(204).end();
      } catch (err) {
        res.status(500).send('Internal server error');
      }
    };
  },
});
