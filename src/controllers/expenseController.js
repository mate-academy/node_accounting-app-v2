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
      return res.status(404).send({ message: 'Expense not found' });
    }

    res.send(expense);
  };

  create = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send({ message: 'Required fields missinge' });
    }

    const user = userService.getById(userId);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
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
      return res.status(404).send({ message: 'Expense not found' });
    }

    const updates = req.body;

    if (updates.userId) {
      const user = userService.getById(updates.userId);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
    }

    if (updates.spentAt) {
      const ts = Date.parse(updates.spentAt);

      if (!Number.isFinite(ts)) {
        return res.status(400).send({ message: 'SpentAt is require' });
      }
    }

    if (updates.title) {
      if (typeof updates.title !== 'string' || updates.title.trim() === '') {
        return res.status(400).send({ message: 'Title is require' });
      }
    }

    if (updates.amount) {
      if (
        typeof updates.amount !== 'number' ||
        !Number.isFinite(updates.amount) ||
        updates.amount <= 0
      ) {
        return res.status(400).send({ message: 'Amount is require' });
      }
    }

    if (updates.category) {
      if (
        typeof updates.category !== 'string' ||
        updates.category.trim() === ''
      ) {
        return res.status(400).send({ message: 'Category is require' });
      }
    }

    if ('note' in updates && typeof updates.note !== 'string') {
      return res.status(400).send({ message: 'Note is require' });
    }

    const updatedExpenses = expenseService.update(id, updates);

    res.send(updatedExpenses);
  };

  delete = (req, res) => {
    const id = Number(req.params.id);

    if (!expenseService.getById(id)) {
      return res.status(404).send({ message: 'Expense not found' });
    }

    expenseService.delete(id);

    res.sendStatus(204);
  };
}
module.exports = new ExpenseController();
