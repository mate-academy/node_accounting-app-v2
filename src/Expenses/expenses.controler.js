const expensesService = require('./expenses.service');
const usersService = require('../Users/users.service');

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
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.status(200).send(expensesItem);
  }

  postOne(req, res) {
    const expenseItem = req.body;
    const { userId, title, amount, category } = expenseItem;

    const userExists = usersService.getOneUser(userId);

    if (!userExists) {
      res.status(400).send({ message: 'User not found' });

      return;
    }

    if (userId == null || title == null || amount == null || category == null) {
      return res.status(400).json({ message: 'Missing required fields' });
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
      ('amount' in paramsToUpdate && typeof amount !== 'number') ||
      (category && typeof category !== 'string') ||
      (note && typeof note !== 'string');

    if (wrongData) {
      res.status(400).send({ message: 'Wrong data' });

      return;
    }

    const requestedExpense = expensesService.getOneExpense(id);

    if (!requestedExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    const updatedItem = expensesService.updateExpense(id, paramsToUpdate);

    res.status(200).send(updatedItem);
  }

  delete(req, res) {
    const id = Number(req.params.id);
    const deletedExpense = expensesService.deleteExpense(id);

    if (!deletedExpense) {
      res.status(404).send({ message: 'Expense not found' });

      return;
    }

    res.sendStatus(204);
  }
}

const expensesController = new ExpensesController();

module.exports = expensesController;
