const { validationResult, matchedData } = require('express-validator');
const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/user.service.js');

const getAll = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const params = matchedData(req, { locations: ['query'] });

  const expenses = expensesService.getAll(params);

  res.send(expenses);
};

const getOne = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const expensesId = req.params.id;

  const expenses = expensesService.getById(expensesId);

  if (!expenses) {
    return res.status(404).send('Not Found');
  }

  res.send(expenses);
};

const create = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });

  const user = usersService.getById(data.userId);

  if (!user) {
    return res.status(400).send('Bad Request');
  }

  const newExpenses = expensesService.create({ ...data });

  res.status(201).send(newExpenses);
};

const update = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });
  const expensesId = req.params.id;

  const expenses = expensesService.getById(expensesId);

  if (!expenses) {
    return res.status(404).send('Not Found');
  }

  const updatedExpenses = expensesService.updateById({
    id: expenses.id,
    ...data,
  });

  res.send(updatedExpenses);
};

const remove = (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const expensesId = req.params.id;

  const expenses = expensesService.getById(expensesId);

  if (!expenses) {
    res.status(404).send('Not Found');

    return;
  }

  expensesService.deleteById(expensesId);

  res.status(204).send('Expenses removed');
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
