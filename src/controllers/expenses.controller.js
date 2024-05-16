const status = require('../constants');
const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getAll();
  let returnData = [...expenses];

  if (userId) {
    returnData = returnData.filter(
      (e) => e.userId.toString() === userId.toString(),
    );
  }

  if (categories) {
    returnData = returnData.filter((e) => e.category === categories);
  }

  if (from && to) {
    returnData = returnData.filter((e) => e.spentAt >= from && e.spentAt < to);
  }

  res.send(returnData);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.send(expense);
};

const create = (req, res) => {
  const { title, spentAt, userId, amount, category, note } = req.body;
  const isParamsValid = !title || !amount || !category || !spentAt || !userId;

  if (isParamsValid) {
    res.sendStatus(status.BAD_REQUEST);
  }

  const user = userService.getOne(userId);

  if (!user) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const expense = expensesService.createOne({
    title,
    spentAt,
    userId,
    amount,
    category,
    note,
  });

  res.status(status.CREATED).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.updateOne(id, req.body);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = expensesService.deleteOne(id);

  if (!deleted) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
