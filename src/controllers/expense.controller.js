/* eslint-disable max-len */
const expenseServices = require('../services/expense.service');

const filterAll = (query, value, array) => {
  switch (query) {
    case 'userId': {
      if (!array.some((expense) => expense.userId === +value)) {
        return 'No matches found';
      }

      return array.filter((expense) => expense.userId === +value);
    }

    case 'categories': {
      for (const category of value) {
        if (!expenseServices.categories.includes(category)) {
          return `The "${category}" category is not valid`;
        }

        if (!array.some((expense) => expense.category === category)) {
          return 'No matches found';
        }
      }

      return array.filter((expense) => value.includes(expense.category));
    }

    case 'from': {
      // I decided not to validate date in query params not to overcomplicate the code
      if (
        !array.some((expense) => new Date(expense.spentAt) > new Date(value))
      ) {
        return 'No matches found';
      }

      return array.filter(
        (expense) => new Date(expense.spentAt) > new Date(value),
      );
    }

    case 'to': {
      if (
        !array.some((expense) => new Date(expense.spentAt) < new Date(value))
      ) {
        return 'No matches found';
      }

      return array.filter(
        (expense) => new Date(expense.spentAt) < new Date(value),
      );
    }

    default:
      return array;
  }
};

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = expenseServices.getAll();

  if (userId) {
    expenses = filterAll('userId', userId, expenses);
  }

  if (categories) {
    expenses = filterAll('categories', categories, expenses);
  }

  if (from) {
    expenses = filterAll('from', from, expenses);
  }

  if (to) {
    expenses = filterAll('to', to, expenses);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const expense = req.body;

  if (errorFound(req)) {
    res.status(400).send(errorFound(req));

    return;
  }

  const newExpense = expenseServices.create(expense);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getOne(id)) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!expenseServices.getOne(id)) {
    res.sendStatus(404);

    return;
  }

  if (errorFound(req)) {
    res.status(400).send(errorFound(req));

    return;
  }

  const updatedExpense = expenseServices.update(expense, id);

  res.send(updatedExpense);
};

const validateDate = (date) => {
  // used for date validation
  const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  if (!isoDateFormatRegex.test(date)) {
    return 'Incorrect date format was entered';
  }

  return '';
};

const errorFound = (req) => {
  const { userId, spentAt, title, amount, category } = req.body;

  // note is optional so we don't check whether it was entered
  if (!userId || !spentAt || !title || !amount || !category) {
    return 'Not all the paramaters were entered';
  }

  if (validateDate(spentAt)) {
    return validateDate(spentAt);
  }

  if (!expenseServices.categories.includes(category)) {
    return 'Incorrect category was entered';
  }

  return '';
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
