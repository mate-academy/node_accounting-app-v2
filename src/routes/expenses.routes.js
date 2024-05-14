const express = require('express');
const router = express.Router();

const createRouter = ({ userService, expensesService }) => {
  router.get('/', (req, res) => {
    const { userId, categories, from, to } = req.query;
    const expenses = expensesService.getAll();
    let returnData = [...expenses];

    if (userId) {
      returnData = returnData.filter(
        (e) => e.userId.toString() === userId.toString(),
      );
    }

    if (categories) {
      returnData = returnData.filter((e) => e.category === categories);
    }

    if (from && to) {
      returnData = returnData.filter(
        (e) => e.spentAt >= from && e.spentAt < to,
      );
    }

    res.send(returnData);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesService.getOne(id);

    if (!expense) {
      return res.sendStatus(404);
    }
    res.send(expense);
  });

  router.post('/', (req, res) => {
    const { title, spentAt, userId, amount, category, note } = req.body;

    if (!title || !amount || !category || !spentAt || !userId) {
      res.sendStatus(400);
    }

    const user = userService.getOne(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = expensesService.createOne({
      title,
      spentAt,
      userId,
      amount,
      category,
      note,
    });

    res.status(201).send(expense);
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesService.updateOne(id, req.body);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleted = expensesService.deleteOne(id);

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  return router;
};

module.exports = { createRouter };
