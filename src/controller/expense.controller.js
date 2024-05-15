const expenseServise = require('../services/expenseService');
const usersService = require('../services/userService');

const expenseController = {};

expenseController.get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = expenseServise.getAll(userId, categories, from, to);

  res.json(filteredExpenses);
};

expenseController.getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseServise.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

expenseController.create = (req, res) => {
  const { userId, title, amount, category, spentAt, note } = req.body;

  const userChecking = usersService.getById(userId);

  if (
    (!userId || !title || !amount || !category,
    !spentAt || !userChecking || !note)
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseServise.create(req.body);

  res.status(201).json(expense);
};

expenseController.update = (req, res) => {
  const { id } = req.params;

  const expense = expenseServise.getById(id);

  if (!expense) {
    res.sendStatus(404);
  }

  const updatedExpense = expenseServise.update(id, req.body);

  res.json(updatedExpense);
};

expenseController.remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServise.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseServise.remove(id);

  res.sendStatus(204);
};

module.exports = expenseController;
