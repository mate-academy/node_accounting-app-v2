'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expensesServices.js');
const { getById: getUser } = require('../services/usersServices');

const getExpenses = (req, res) => {
  const body = req.query;
  const expenses = getAll();
  const keysBody = Object.keys(body);
  let copyExpenses = [...expenses];

  if (keysBody.length > 0) {
    for (let i = 0; i < keysBody.length; i++) {
      switch (keysBody[i]) {
        case 'userId':
          copyExpenses = copyExpenses
            .filter(expens => expens.id === body.userId);
          break;
        case 'categories':
          copyExpenses = copyExpenses
            .filter(expens => expens.categories === body.categories);
          break;
        case 'from':
          copyExpenses = copyExpenses
            .filter(expens => new Date(body.from) <= new Date(expens.spentAt));
          break;
        case 'to':
          copyExpenses = copyExpenses
            .filter(user => new Date(user.spentAt) <= new Date(body.to));
          break;
      }
    }

    res.status(200).send(copyExpenses);

    return;
  }

  res.status(200).send(expenses);
};

const createExpense = (req, res) => {
  const { userId, amount, category, note, title, spentAt } = req.body;
  const foundUser = getUser(userId);

  if (!foundUser || !amount || !category || !note || !title || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpences = create({
    userId, amount, category, note, title, spentAt,
  });

  res.status(201).send(newExpences);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpenses);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!Number(id)) {
    res.sendStatus(400);

    return;
  }

  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const reqBody = req.body;

  if (Object.keys(reqBody).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updateHaveExpense = update(reqBody, id);

  res.status(200).send(updateHaveExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
