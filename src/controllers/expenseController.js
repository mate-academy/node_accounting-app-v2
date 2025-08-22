const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

class ExpenseController {
  getByFilter = (req, res) => {
    const { categories, userId, from, to } = req.query;

    const filteredExpenses = expenseService.getByFilter({
      categories,
      userId,
      from,
      to,
    });

    res.send(filteredExpenses);
  };

  getById = (req, res) => {
    const id = Number(req.params.id);
    const expense = expenseService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  };

  create = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const user = userService.getById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expenseService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(newExpense);
  };

  update = (req, res) => {
    const id = Number(req.params.id);
    const expense = expenseService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updates = req.body;

    if (updates.userId) {
      const user = userService.getById(updates.userId);

      if (!user) {
        res.sendStatus(404);

        return;
      }
    }

    if (updates.spentAt) {
      const ts = Date.parse(updates.spentAt);

      if (!Number.isFinite(ts)) {
        res.sendStatus(404);

        return;
      }
    }

    if (updates.title) {
      if (typeof updates.title !== 'string' || updates.title.trim() === '') {
        res.sendStatus(404);

        return;
      }
    }

    if (updates.amount) {
      if (
        typeof updates.amount !== 'number' ||
        !Number.isFinite(updates.amount) ||
        updates.amount <= 0
      ) {
        res.sendStatus(404);

        return;
      }
    }

    if (updates.category) {
      if (
        typeof updates.category !== 'string' ||
        updates.category.trim() === ''
      ) {
        res.sendStatus(404);

        return;
      }
    }

    if ('note' in updates && typeof updates.note !== 'string') {
      res.sendStatus(404);

      return;
    }

    const updatedExpenses = expenseService.update(id, updates);

    res.send(updatedExpenses);
  };

  delete = (req, res) => {
    const id = Number(req.params.id);

    if (!expenseService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    expenseService.delete(id);

    res.sendStatus(204);
  };
}
module.exports = new ExpenseController();
