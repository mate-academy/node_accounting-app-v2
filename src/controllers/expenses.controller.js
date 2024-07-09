const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

class ExpensesController {
  getAllExpenses = (req, res) => {
    try {
      res.send(expensesService.getAll(req.query));
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  createExpense = (req, res) => {
    try {
      const { userId } = req.body;
      const user = usersService.getById(userId);

      if (!user) {
        res.sendStatus(400);

        return;
      }

      return res.status(201).json(expensesService.create(req.body));
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  getExpense = (req, res) => {
    try {
      const { id } = req.params;
      const expense = expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(expense);
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  updateExpense = (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const expense = expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(expensesService.update(id, data));
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
  deleteExpense = (req, res) => {
    try {
      const { id } = req.params;
      const expense = expensesService.getById(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      expensesService.delete(id);
      res.sendStatus(204);
    } catch {
      res.statusCode = 500;
      res.send('Something went wrong');
    }
  };
}

const expensesController = new ExpensesController();

module.exports = { expensesController };
