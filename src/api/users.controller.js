const { services: userServices } = require('./users.service');

const controller = {
  getUsers(req, res) {
    const users = userServices.getUsers();

    res.json(users);
  },
  getUser(req, res) {
    const { id } = req.params;
    const user = userServices.getUser(parseInt(id, 10));

    if (user === null) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  },
  createUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const newUser = userServices.createUser(name);

    res.status(201).json(newUser);
  },
  deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = userServices.deleteUser(parseInt(id, 10));

    if (deletedUser === null) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(204).end();
  },
  updateUser(req, res) {
    const { id } = req.params;
    const updatedUserData = req.body;

    if (Object.keys(updatedUserData).length === 0) {
      res.status(400).json({ message: 'No data provided for update' });

      return;
    }

    const updatedUser = userServices.updateUser(
      parseInt(id, 10),
      updatedUserData,
    );

    if (updatedUser === null) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(updatedUser);
  },
};

module.exports = {
  controller,
};
