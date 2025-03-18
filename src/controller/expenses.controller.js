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

    res.json(expenses);
  },
  getOne: (req, res) => {
    const expense = expensesService.getById(+req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.json(expense);
  },
  create: (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = userService.getById(+userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const createdExpense = expensesService.create(req.body);

    res.status(201).json(createdExpense);
  },

  remove: (req, res) => {
    const expenseToRemove = expensesService.getById(+req.params.id);

    if (!expenseToRemove) {
      return res.sendStatus(404);
    }

    expensesService.removeById(+req.params.id);

    res.sendStatus(204);
  },
  update: (req, res) => {
    const id = +req.params.id;

    const updatedExpense = expensesService.updateById(id, req.body);

    if (!updatedExpense) {
      return res.sendStatus(404);
    }

    return res.json(updatedExpense);
  },
};

module.exports = {
  expensesController,
};
