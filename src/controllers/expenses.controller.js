const expenseService = require('./../services/expenses.service');
const userService = require('./../services/user.service');

function getExpensesController(req, res) {
  const { userId, categories, from, to } = req.query;

  if (Object.keys(req.query).length !== 0) {
    const filteredExpenses = expenseService.getExpenseByCategory(
      userId,
      categories,
      from,
      to,
    );

    res.status(200).json(filteredExpenses);
  } else {
    res.status(200).json(expenseService.getAllExpenses());
  }
}

function getExpenseByIdController(req, res) {
  const id = req.params.id;

  if (id === undefined) {
    res.status(400).send('id is required');

    return;
  }

  const expense = expenseService.getExpenseById(id);

  if (expense === undefined) {
    res.status(404).send('Not Found');

    return;
  }
  res.send(expense);
}

function addExpenseController(req, res) {
  const bodyRequest = req.body;

  if (Object.keys(bodyRequest).length === 0) {
    res.status(400).send('body is required');

    return;
  }

  const userExists = userService.getUserById(bodyRequest.userId);

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(bodyRequest);

  res.status(201).send(newExpense);
}

function deleteExpenseController(req, res) {
  const id = req.params.id;

  if (id === undefined) {
    res.status(400).send('User does not exist');

    return;
  }

  const deleteStatus = expenseService.deleteExpense(id);

  if (deleteStatus === undefined) {
    res.status(404).send('Not Found');
  } else {
    res.sendStatus(204);
  }
}

function updateExpenseController(req, res) {
  const id = req.params.id;
  const bodyRequest = req.body;

  if ([bodyRequest].some((item) => item === undefined)) {
    res.status(400).send('body is required');

    return;
  }

  const expense = expenseService.updateExpense(id, bodyRequest);

  if (expense === undefined) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).send(expense);
  }
}

module.exports = {
  getExpensesController,
  getExpenseByIdController,
  addExpenseController,
  deleteExpenseController,
  updateExpenseController,
};
