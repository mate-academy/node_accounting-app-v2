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

  const user = usersService.getUserById(newExpenses.userId);

  if (!user) {
    throw new Error(ERRORS.USER_NOT_FOUND);
  }

  expensesArray.push(newExpenses);

  return newExpenses;
};

const getExpensesById = (id) => expensesArray.find((exp) => exp.id === id);

const deleteExpenses = (id) => {
  expensesArray = expensesArray.filter((exp) => exp.id !== id);
};

const updateExpenses = (id, params) => {
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
