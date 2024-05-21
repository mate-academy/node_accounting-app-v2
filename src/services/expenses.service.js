const { filterExpenses } = require('../helpers/filterExpenses');
const { generateId } = require('../helpers/generateId');
const { ERRORS } = require('../variables/variables');
const { usersService } = require('./users.service');

let expensesArray = [];

const initExpensesService = () => {
  expensesArray = [];
};

const getExpenses = (params) => {
  return filterExpenses(expensesArray, params);
};

const createExpenses = (expenses) => {
  const newExpenses = { ...expenses, id: generateId() };

  const REQUIRED_FIELDS = ['userId', 'spentAt', 'title', 'amount', 'category'];

  if (REQUIRED_FIELDS.some((field) => !expenses[field])) {
    throw new Error(ERRORS.bodyRequired);
  }

  try {
    usersService.getUserById(newExpenses.userId);

    expensesArray.push(newExpenses);
  } catch (err) {
    throw new Error(ERRORS.badUserRequest);
  }

  return newExpenses;
};

const getExpensesById = (id) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  if (!expensesArray.length) {
    throw new Error(ERRORS.expensesNotFound);
  }

  return expensesArray.find((exp) => exp.id === id);
};

const deleteExpenses = (id) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  if (!expensesArray.length) {
    throw new Error(ERRORS.expensesNotFound);
  }

  expensesArray = expensesArray.filter((exp) => exp.id !== id);
};

const updateExpenses = (id, params) => {
  if (!id) {
    throw new Error(ERRORS.idRequired);
  }

  if (!params) {
    throw new Error(ERRORS.bodyRequired);
  }

  if (!expensesArray.length) {
    throw new Error(ERRORS.expensesNotFound);
  }

  const updatedUser = { ...getExpensesById(id), ...params };

  const index = expensesArray.findIndex((exp) => exp.id === id);

  expensesArray[index] = updatedUser;

  return updatedUser;
};

const expensesService = {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
};

module.exports = {
  expensesService,
  initExpensesService,
};
