const { usersService } = require('../services/users.service');

class UsersController {
  getAllUsers = (req, res) => {
    res.send(usersService.getAll());
  };
  createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    return res.status(201).json(usersService.create(name));
  };
  getUser = (req, res) => {
    const { id } = req.params;
    const user = usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  };
  updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    res.send(usersService.udpate(id, name));
  };
  deleteUser = (req, res) => {
    const { id } = req.params;
    const user = usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    usersService.delete(id);
    res.sendStatus(204);
  };
}

const usersController = new UsersController();

module.exports = { usersController };
