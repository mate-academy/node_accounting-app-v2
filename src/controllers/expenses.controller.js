'use strict';

const Express = require('express'); // eslint-disable-line
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};

/* eslint no-console: "warn" */

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function get(req, res) {
  console.info('\napp.get(\'/expenses\')\n');

  const { userId, ...restQueryParams } = req.query;

  res.status(200)
    .send(expensesService.getAll({
      userId: +userId,
      ...restQueryParams,
    }));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function getById(req, res) {
  console.info(`\napp.get('/expenses:id=${req.params.id}')\n`);

  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400).send('Required params { id: number }');

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200).send(expense);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function create(req, res) {
  console.info(`\napp.post('/expenses\n`);

  /** @type {expensesService.Expense} */
  const { userId, spentAt, title, amount, category, note } = req.body;
  const normUserId = +userId;
  const normAmount = +amount;

  console.info(// eslint-disable-line
    `marck1
  ${normUserId} ${userId}
  ${spentAt}
  ${title}
  ${normAmount} ${amount}
  ${category}
  ${note}
  `);

  if (!Number.isInteger(normUserId)
    || !Number.isInteger(normAmount)
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string') {
    res.status(400).send('Required params');

    return;
  }

  if (!usersService.getById(normUserId)) {
    res.status(400).send('User not exist');

    return;
  }

  const newExpense = {
    userId: normUserId,
    spentAt,
    title,
    amount: normAmount,
    category,
    note,
  };

  const expense
    = expensesService.create(newExpense);

  res.status(201).send(expense);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function remove(req, res) {
  console.info(`\napp.delete('/expenses:id=${req.params.id}'\n`);

  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400).send('Required params { id: number }');

    return;
  }

  const expense = expensesService.removeById(id);

  if (!expense) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(204).send(String(id));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
function update(req, res) {
  console.info(`\napp.patch('/expenses:id=${req.params.id}'\n`);

  const id = +req.params.id;
  const foundExpense = expensesService.getById(id);

  if (!foundExpense) {
    res.status(404).send('Expense not exist');

    return null;
  }

  let updateExpense = expensesService.findMatchProps(
    foundExpense,
    req.body
  );

  if (!updateExpense) {
    res.status(400).send('Required params');

    return;
  }

  updateExpense = expensesService.update({
    ...updateExpense,
    id,
  });

  if (!updateExpense) {
    res.status(404).send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200).send(updateExpense);
}
