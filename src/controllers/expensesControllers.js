'use strict';

const userSevises = require('../servises/userServises');
const expensesSevises = require('../servises/expensesServises');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const expensesToShow = expensesSevises.getByQuery(
    userId,
    category,
    from,
    to
  );

  res.send(expensesToShow);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesSevises.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const query = req.body;
  const foundUser = userSevises.getOne(query.userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesSevises.create(query);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExp = expensesSevises.getOne(expenseId);

  if (!foundExp) {
    res.sendStatus(404);

    return;
  }

  expensesSevises.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExp = expensesSevises.getOne(expenseId);

  if (!foundExp) {
    res.sendStatus(404);

    return;
  }

  expensesSevises.update(foundExp, req.body);
  res.send(foundExp);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
