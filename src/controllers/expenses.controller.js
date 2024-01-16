'use strict';

const expensesService = require('./../services/expenses.service');

const get = (req, res) => {
  const expenses = expensesService.get(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const props = req.body;

  const [
    arePropsValid,
    validatedProps,
  ] = (expensesService.validateOnCreate(props));

  if (!arePropsValid) {
    res.status(400).send('Invalid props for expense creation');

    return;
  }

  const expense = expensesService.create(validatedProps);

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id: idRaw } = req.params;
  const id = +idRaw;
  const props = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  const [
    arePropsValid,
    validatedProps,
  ] = expensesService.validateOnUpdate(props);

  if (!arePropsValid) {
    res.status(400).send('Invalid props for expense update');

    return;
  }

  const updatedExpense = expensesService.update(id, validatedProps);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
