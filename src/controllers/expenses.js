'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');
const utils = require('../utils/utils.js');

const getByQuery = (req, res) => {
  const query = req.query;
  const queryVariations = ['userId', 'category', 'from', 'to'];

  const isValidQueries = Object.entries(query).every(
    ([key, value]) => queryVariations.includes(key) && !utils.isEmpty(value)
  );

  if (!isValidQueries) {
    res.status(400).send(
      { message: `Invalid query, possible queries are `
      + queryVariations.join(', ') }
    );

    return;
  }

  const filteredExpenses = expenseService.getByParams(query);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(Number(expenseId))) {
    res.status(400).send(
      { message: 'Invalid expense ID, ID can be only number' }
    );

    return;
  }

  const expense = expenseService.getById(expenseId);

  if (!expense) {
    res.status(404).send(
      { message: 'Cannot found expense using provided ID' }
    );

    return;
  }

  res.send(expense);
};

const createNew = (req, res) => {
  const { userId, spentAt } = req.body;
  const isDateInvalid = utils.validateDate(spentAt);
  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const isHasRequiredFields = requiredFields.every(
    (field) => field in req.body && !utils.isEmpty(req.body[field])
  );

  if (!isDateInvalid) {
    res.status(400).send(
      { message: 'Provided Date isn\'t valid' }
    );

    return;
  }

  if (!isHasRequiredFields) {
    res.status(400).send(
      { message: 'Request Body has not all required fields' }
    );

    return;
  }

  if (!userService.getById(userId)) {
    res.status(404).send(
      { message: 'Could find user with provided userId' }
    );

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const removeById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseService.getById(expenseId)) {
    res.status(404).send(
      { message: 'Could find expense with provided userId' }
    );

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const editById = (req, res) => {
  const { expenseId } = req.params;
  const dataToEdit = req.body;
  const { spentAt } = req.body;
  const notAllowedFieldsToEdit = ['id', 'userId'];

  const hasNotAllowedProps = Object.entries(dataToEdit)
    .some(([key]) => notAllowedFieldsToEdit.includes(key));

  const isSomeFieldsEmpty = Object.entries(dataToEdit)
    .some(([key, value]) => utils.isEmpty(value));

  if (isSomeFieldsEmpty) {
    res.status(400).send(
      { message: 'Fields values cannot be empty' }
    );

    return;
  }

  if (hasNotAllowedProps) {
    res.status(400).send(
      { message: `Modifying 'id' and 'userID' are not allowed` }
    );

    return;
  }

  if (!expenseService.getById(expenseId)) {
    res.status(404).send(
      { message: 'Could find expense this provided ID' }
    );

    return;
  }

  if (spentAt && !utils.validateDate(spentAt)) {
    res.status(400).send(
      { message: `Edited field 'spendAt' is not valid` }
    );

    return;
  }

  const editedExpense = expenseService.edit(expenseId, dataToEdit);

  res.send(editedExpense);
};

module.exports = {
  getByQuery,
  createNew,
  getById,
  removeById,
  editById,
};
