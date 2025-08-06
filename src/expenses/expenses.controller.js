const expensesService = require('./expenses.service');
const usersService = require('../users/users.service');

class ExpensesController {
  getAll(req, res) {
    const { userId, categories, from, to } = req.query;

    const filters = {
      userId: userId ? Number(userId) : null,
      categories: Array.isArray(categories)
        ? categories
        : categories
          ? [categories]
          : null,
      from: from ? new Date(from) : null,
      to: to ? new Date(to) : null,
    };

    const expensesList = expensesService.getAllExpenses(filters);

    res.status(200).send(expensesList);
  }

  getOne(req, res) {
    const id = Number(req.params.id);

    const expensesItem = expensesService.getOneExpense(id);

    if (!expensesItem) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expensesItem);
  }

  postOne(req, res) {
    const expenseItem = req.body;
    const { userId } = expenseItem;

    const userExists = usersService.getOneUser(userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const newExpenseItem = expensesService.createExpense(expenseItem);

    res.status(201).send(newExpenseItem);
  }

  updateOne(req, res) {
    const paramsToUpdate = req.body;
    const id = Number(req.params.id);
    const { title, amount, category, note } = paramsToUpdate;

    const wrongData =
      (title && typeof title !== 'string') ||
      (amount && (amount === 0 || typeof amount !== 'number')) ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string');

    if (wrongData) {
      res.sendStatus(400);

      return;
    }

    const requestedExpense = expensesService.getOneExpense(id);

    if (!requestedExpense) {
      res.sendStatus(404);

      return;
    }

    const updatedItem = expensesService.updateExpense(id, paramsToUpdate);

    res.status(200).send(updatedItem);
  }

  delete(req, res) {
    const id = Number(req.params.id);
    const deletedExpense = expensesService.deleteExpense(id);

    if (!deletedExpense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  }
}

const expensesController = new ExpensesController();

module.exports = expensesController;
