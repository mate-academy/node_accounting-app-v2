const { STATUS } = require('../utils/statusCodes');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) =>
  res.status(STATUS.OK).send(expensesService.getAll(req.query));

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = expensesService.getOneById(id);

  if (!expense) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);

    return;
  }

  res.status(STATUS.OK).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;
  const user = usersService.getOneById(userId);

  if (
    !user ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string'
  ) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = expensesService.create(req.body);

  res.status(STATUS.CREATED).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  if (!expensesService.getOneById(id)) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);

    return;
  }

  expensesService.remove(id);

  res
    .status(STATUS.NO_CONTENT)
    .send(`The expense with ${id} ID was successfully deleted.`);
};

const update = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const expense = expensesService.update(id, req.body);

  if (!expense) {
    res
      .status(STATUS.NOT_FOUND)
      .send(`The expense with ${id} ID does not exist.`);
  }

  res.status(STATUS.OK).send(expense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
