'use strict';

const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

const getOne = async (req, res) => {
  const expense = await expensesService.getById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const getAll = async (req, res) => {
  let expenses = await expensesService.getAll();

  const { userId, from, to, categories } = req.query;

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses.filter((expense) => {
      return new Date(expense.spentAt) >= new Date(from);
    });
  }

  if (to) {
    expenses = expenses.filter((expense) => {
      return new Date(expense.spentAt) <= new Date(to);
    });
  }

  if (categories) {
    const categoryList = Array.isArray(categories) ? categories : [categories];

    expenses = expenses.filter((expense) => {
      return categoryList.includes(expense.category);
    });
  }

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(+userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(
    +userId,
    spentAt,
    title,
    +amount,
    category,
    note || '',
  );

  res.status(201).json(expense);
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.getById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(+req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updates = { ...req.body };

  if (updates.userId) {
    updates.userId = +updates.userId;
  }

  if (updates.amount) {
    updates.amount = +updates.amount;
  }

  const updatedExpense = await expensesService.update({
    id,
    ...updates,
  });

  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};

module.exports = {
  expensesController,
};
