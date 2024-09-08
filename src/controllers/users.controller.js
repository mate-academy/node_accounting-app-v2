const { usersService } = require('../services/users.service');

class UsersController {
  getAllUsers = (req, res) => {
    try {
      res.send(usersService.getAll());
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  createUser = (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      return res.status(201).json(usersService.create(name));
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  getUser = (req, res) => {
    try {
      const { id } = req.params;
      const user = usersService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.send(user);
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  updateUser = (req, res) => {
    try {
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
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  deleteUser = (req, res) => {
    try {
      const { id } = req.params;
      const user = usersService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      usersService.delete(id);
      res.sendStatus(204);
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
}

const usersController = new UsersController();

module.exports = { usersController };
