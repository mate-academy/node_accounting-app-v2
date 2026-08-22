'use strict';

function createExpensesController(expensesService) {
  const getAll = (req, res) => {
    const { userId, categories, from, to } = req.query;

    res.json(
      expensesService.getAll({
        userId,
        categories,
        from,
        to,
      }),
    );
  };

  const getOne = (req, res) => {
    const expense = expensesService.getById(+req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(expense);
  };

  const create = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !title || !amount || !category || !spentAt) {
      res.sendStatus(400);

      return;
    }

    if (!expensesService.userExists(userId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  };

  const update = (req, res) => {
    const expense = expensesService.getById(+req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = expensesService.update(+req.params.id, req.body);

    res.json(updatedExpense);
  };

  const remove = (req, res) => {
    const deletedExpense = expensesService.remove(+req.params.id);

    if (!deletedExpense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  };

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
  };
}

module.exports = {
  createExpensesController,
};
