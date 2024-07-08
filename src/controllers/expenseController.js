const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

module.exports = {
  getAll(req, res) {
    const { userId, categories, from, to } = req.query;
    const numberUserId = parseInt(userId);

    const expenses = expenseService.getAllFiltered({
      userId: numberUserId,
      categories,
      from,
      to,
    });

    res.status(200).send(expenses);
  },
  getOne(req, res) {
    const id = parseInt(req.params.id);

    const expense = expenseService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expense);
  },
  create(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const foundUser = userService.getById(userId);

    if (
      !userId ||
      !spentAt ||
      !title ||
      !amount ||
      !category ||
      !note ||
      !foundUser
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = expenseService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(expense);
  },
  update(req, res) {
    const currentId = parseInt(req.params.id);
    const { id, userId, spentAt, title, amount, category, note } = req.body;

    const foundExpense = expenseService.getById(currentId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!id && !userId && !spentAt && !title && !amount && !category && !note) {
      res.sendStatus(400);

      return;
    }

    const updatedExpense = expenseService.update({
      currentId,
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(200).send(updatedExpense);
  },
  remove(req, res) {
    const id = parseInt(req.params.id);

    const foundExpense = expenseService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenseService.remove(id);

    res.sendStatus(204);
  },
};
