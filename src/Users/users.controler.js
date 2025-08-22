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
      res.status(404).send({ message: 'User not found' });

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
      res.status(400).send({ message: 'Wrong data' });

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
      res.status(400).send({ message: 'Wrong data' });

      return;
    }

    const updatedUser = usersService.updateUser(id, paramsToUpdate);

    if (!updatedUser) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(200).send(updatedUser);
  }

  delete(req, res) {
    const id = Number(req.params.id);
    const deletedUser = usersService.deleteUser(id);

    if (!deletedUser) {
      res.status(404).send({ message: 'User not found' });

      return;
    }

    res.status(204).send();
  }
}

const usersController = new UsersController();

module.exports = usersController;
