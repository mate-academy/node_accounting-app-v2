'use strict';

const { expenseService } = require('../services/expense.service.js');
const { userService } = require('../services/user.service.js');

const getAllFiltered = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filteredExpenses = expenseService.getAllFiltered({
    userId,
    categories,
    from,
    to,
  });

  res.send(filteredExpenses);
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

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400)
      .send('Request missing one or more of the properties');
  }

  const user = userService.getById(+userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = expenseService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  expenseService.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  const updatedExpense = expenseService.update({
    id: +id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  expenseController: {
    getAllFiltered,
    create,
    getOne,
    remove,
    update,
  },
};
