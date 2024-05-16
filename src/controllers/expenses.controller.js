const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    const expenses = expensesService.getAllExpenses(
      userId,
      categories,
      from,
      to,
    );

    res.status(200).send(expenses);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createExpense = (req, res) => {
  try {
    const body = req.body;
    const { userId } = body;

    const newExpense = expensesService.createNewExpense(body);

    const user = usersService.getById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    res.status(201).send(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getById = (req, res) => {
  try {
    const { id } = req.params;
    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const removeExpense = (req, res) => {
  try {
    const { id } = req.params;

    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expensesService.removeExpenseById(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateExpense = (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = expensesService.updateExpenseById(id, data);

    res.status(200).send(updatedExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  createExpense,
  getById,
  removeExpense,
  updateExpense,
};
