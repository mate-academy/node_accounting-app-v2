'use strict';

const ExpenseModel = require('../models/Expense');
const UserModel = require('../models/User');

const get = (req, res) => {
  const params = req.query;

  const expenses = ExpenseModel.get(params);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (id) {
    const expense = ExpenseModel.getById({ id: +id });

    if (expense) {
      res.send(expense);

      return;
    }

    res.sendStatus(404);

    return;
  }

  res.sendStatus(400);
};

const create = (req, res) => {
  const { title, amount, category, note, spentAt, userId } = req.body;

  const user = UserModel.getById({ id: userId });

  if (
    ![title, amount, category, spentAt]
      .some(item => item === undefined)
    && user
  ) {
    const newExpense = ExpenseModel.create({
      title,
      amount,
      category,
      spentAt,
      userId,
      note: note || '',
    });

    res.status(201).send(newExpense);

    return;
  }

  res.sendStatus(400);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expenseIndex = ExpenseModel.remove({ id: +id });

  if (expenseIndex !== -1) {
    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

const update = (req, res) => {
  const { id } = req.params;
  const params = req.body;
  const expense = ExpenseModel.getById({ id: +id });

  if (expense) {
    const updatedExpense = ExpenseModel.update({
      id: +id,
      newParams: params,
    });

    if (updatedExpense) {
      res.send(updatedExpense);

      return;
    }
  }

  res.sendStatus(404);
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
