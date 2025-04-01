const { expensesService } = require('../services/expenses.service');
const { userService } = require('../services/users.service');

const expensesController = {
  getAll: (req, res) => {
    const { userId, categories, from, to } = req.query;

    const expenses = expensesService.getAll({
      userId,
      categories,
      from,
      to,
    });

    res.send(expenses);
  },

  getOne: (req, res) => {
    const expense = expensesService.getExpenseById(+req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  },

  create: (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const user = userService.getUserById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(newExpense);
  },

  remove: (req, res) => {
    const expense = expensesService.getExpenseById(+req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(+req.params.id);
    res.sendStatus(204);
  },

  update: (req, res) => {
    const id = +req.params.id;

    const expense = expensesService.update(id, req.body);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  },
};

module.exports = {
  expensesController,
};
