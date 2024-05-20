const { sendErrorResponse } = require('../helpers/sendErrorMessage');
const { usersService, initUserService } = require('../services/users.service');
const { validateUser, validateId } = require('../validators/users.validator');
const { STATUS_CODES, ERRORS } = require('../variables/variables');

const usersUrl = '/users';

const usersController = (server) => {
  initUserService();

  server.get(usersUrl, (req, res) => {
    const users = usersService.getUsers();

    res.status(STATUS_CODES.OK).send(users);
  });

  server.post(usersUrl, (req, res) => {
    const user = req.body;

    validateUser(user, res);

    const newUser = usersService.createUser(user);

    res.status(STATUS_CODES.CREATED).send(newUser);
  });

  server.get(`${usersUrl}/:id`, (req, res) => {
    const id = req.params.id;

    validateId(id, res);

    const user = usersService.getUserById(+id);

    if (!user) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);
    }

    res.status(STATUS_CODES.OK).send(user);
  });

  server.delete(`${usersUrl}/:id`, (req, res) => {
    const id = req.params.id;

    validateId(id, res);

    const user = usersService.getUserById(+id);

    if (!user) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);
    }

    usersService.deleteUser(+id);
    res.status(STATUS_CODES.NO_CONTENT).end();
  });

  server.patch(`${usersUrl}/:id`, (req, res) => {
    const id = req.params.id;
    const params = req.body;

    validateId(id, res);

    const user = usersService.getUserById(+id);

    if (!user) {
      sendErrorResponse(res, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);
    }

    const updatedUser = usersService.updateUser(+id, params);

    res.status(STATUS_CODES.OK).send(updatedUser);
  });
};

module.exports = {
  usersController,
};
