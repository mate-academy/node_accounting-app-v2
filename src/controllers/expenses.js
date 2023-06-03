const expensesService = require('../servises/expenses');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  res.send(expenses);
};

const create = (req, res) => {
  const expenseData = req.body;

  const newExpense = expensesService.add(expenseData);

  if (!newExpense) {
    res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const isExpense = expensesService.getById(expenseId);

  if (!isExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const dataToChange = req.body;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const result = expensesService.edit(foundExpense, dataToChange);

  if (result) {
    res.statusCode = 200;
    res.send(foundExpense);
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
