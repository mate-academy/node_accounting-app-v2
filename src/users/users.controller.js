const usersService = require('./users.service');

class UsersController {
  getAll(req, res) {
    const usersList = usersService.getAllUsers();

    res.status(200).send(usersList);
  }

  getOne(req, res) {
    const id = Number(req.params.id);
    const user = usersService.getOneUser(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(user);
  }

  postOne(req, res) {
    const userData = req.body;
    const { name } = userData;

    const isRequiredFieldsMissing = !name;
    const wrongData = typeof name !== 'string';

    if (isRequiredFieldsMissing || wrongData) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersService.createUser(userData);

    res.status(201).send(newUser);
  }

  updateOne(req, res) {
    const paramsToUpdate = req.body;
    const id = Number(req.params.id);
    const { name } = paramsToUpdate;

    // Only validate fields that are being updated
    const wrongData = name !== undefined && typeof name !== 'string';

    if (wrongData) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = usersService.updateUser(id, paramsToUpdate);

    if (!updatedUser) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(updatedUser);
  }

  delete(req, res) {
    const id = Number(req.params.id);
    const deletedUser = usersService.deleteUser(id);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  }
}

const usersController = new UsersController();

module.exports = usersController;
