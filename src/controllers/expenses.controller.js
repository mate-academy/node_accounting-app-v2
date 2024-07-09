const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

class ExpensesController {
  getAllExpenses = (req, res) => {
    res.send(expensesService.getAll(req.query));
  };
  createExpense = (req, res) => {
    const { userId } = req.body;
    const user = usersService.getById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    return res.status(201).json(expensesService.create(req.body));
  };
  getExpense = (req, res) => {
    const { id } = req.params;
    const expense = expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  };
  updateExpense = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const expense = expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expensesService.update(id, data));
  };
  deleteExpense = (req, res) => {
    const { id } = req.params;
    const expense = expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expensesService.delete(id);
    res.sendStatus(204);
  };
}

const expensesController = new ExpensesController();

module.exports = { expensesController };
