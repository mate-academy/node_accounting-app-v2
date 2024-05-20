const { STATUS } = require('../utils/statusCodes');
const usersService = require('../services/users.service');

const getAll = (req, res) => res.status(STATUS.OK).send(usersService.getAll());

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const user = usersService.getOneById(id);

  if (!user) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  res.status(STATUS.OK).send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  res.status(STATUS.CREATED).send(usersService.create(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  if (!usersService.getOneById(id)) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  usersService.remove(id);

  res
    .status(STATUS.NO_CONTENT)
    .send(`The user with ${id} ID was successfully deleted.`);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters or data.');

    return;
  }

  const user = usersService.update(id, name);

  if (!user) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
