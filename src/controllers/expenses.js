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

  if (keysBody.length > 0) {
    const filteredExpenses = expenses.filter(expense => {
      return keysBody.every(key => {
        switch (key) {
          case 'userId':
            return expense.userId === +body.userId;
          case 'categories':
            return expense.category === body.categories;
          case 'from':
            const fromDate = new Date(body.from);

            return new Date(expense.spentAt) >= fromDate;
          case 'to':
            const toDate = new Date(body.to);

            return new Date(expense.spentAt) <= toDate;
          default:
            return true;
        }
      });
    });

    res.status(200).send(filteredExpenses);
  } else {
    res.status(200).send(expenses);
  }
};

const createExpense = (req, res) => {
  const { userId, amount, category, note, title, spentAt } = req.body;
  const foundUser = getUser(userId);

  if (!foundUser || !amount || !category || !note || !title || !spentAt) {
    res.status(400).send('Bad');

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
