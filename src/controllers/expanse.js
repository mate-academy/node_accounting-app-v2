'use strict';

const { expensesServices } = require('../services/expenses');
const { usersServices } = require('../services/users');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = expensesServices.getAll();

  if (userId || categories || (from && to)) {
    expenses = expensesServices.getFiltered(
      Number(userId), categories, from, to
    );
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getById(Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const findUser = usersServices.getById(Number(userId));

  if (!findUser) {
    res.status(400).send('User not found');

    return;
  }

  const newExpense = expensesServices.create(
    userId, spentAt, title, amount, category, note
  );

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const status = expensesServices.remove(Number(id));

  if (!status) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const updatedExpense = expensesServices.update(Number(id), req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExpense);
};

const expensesController = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = { expensesController };
