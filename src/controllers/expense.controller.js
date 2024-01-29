const expenseService = require('../services/expense.service.js');
const { checkIsReqBodyValid } = require('../helpers/checkIsReqBodyValid.js');

const get = (req, res) => {
  if (Object.entries(req.body).length === 0) {
    res.send(expenseService.getAll());
  }

  const { ...params } = req.body;

  const listOfExpectedParams = [
    { key: 'userId', type: 'string' },
    { key: 'categories', type: 'Array string' },
    { key: 'from', type: 'string($date-time)' },
    { key: 'to', type: 'string($date-time)' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(params, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);
  } else {
    res.send(expenseService.getSome(params));
  }
};

const create = (req, res) => {
  const { ...params } = req.body;

  const listOfExpectedParams = [
    { key: 'userId', type: 'string' },
    { key: 'spentAt', type: 'string($date-time)' },
    { key: 'title', type: 'string' },
    { key: 'amount', type: 'number' },
    { key: 'category', type: 'string' },
    { key: 'note', type: 'string' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(params, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);
    return;
  }

  const newExpense = expenseService.create(params);
  res.status(201).send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundExpense = expenseService.getById(id);

  if (isNaN(+id)) {
    res.sendStatus(400);
    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);
    return;
  }

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);
    return;
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { ...params } = req.body;

  const listOfExpectedParams = [
    { key: 'userId', type: 'string' },
    { key: 'spentAt', type: 'string($date-time)' },
    { key: 'title', type: 'string' },
    { key: 'amount', type: 'number' },
    { key: 'category', type: 'string' },
    { key: 'note', type: 'string' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(params, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);
    return;
  }

  if (!expenseService.getById(id)) {
    res.sendStatus(404);
    return;
  }

  const updatedExpense = expenseService.update(id, params);
  res.send(updatedExpense);
};

module.exports = { get, getOne, create, remove, update };
