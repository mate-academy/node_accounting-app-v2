const { expenseService, userService } = require('../service');

const create = (req, res) => {
  const user = userService.getById(req.body.userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newRecord = expenseService.create(req.body);

  if (!newRecord) {
    return res.sendStatus(400);
  }

  res.status(201).send(newRecord);
};

const getAll = (req, res) => {
  const data = expenseService.getAll(req.query);

  res.send(data);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const record = expenseService.getById(+id);

  if (!record) {
    return res.sendStatus(404);
  }

  res.send(record);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expenseService.remove(+id);

  res.sendStatus(204);
};

const patch = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updated = expenseService.update(+id, req.body);

  res.send(updated);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  patch,
};
