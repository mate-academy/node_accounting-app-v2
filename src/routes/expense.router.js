const expenseRouter = require('express').Router();
const { expenseService } = require('../api/expense.service');

module.exports = { expenseRouter };

expenseRouter.get('/', async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expenseService.getExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.json(expenses);
});

expenseRouter.post('/', async (req, res) => {
  const data = req.body;

  if (Object.keys(data).length === 0) {
    return res.sendStatus(400);
  }

  const newExpense = await expenseService.createExpense(data);

  if (!newExpense) {
    return res.sendStatus(400);
  }

  res.status(201).json(newExpense);
});

expenseRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getExpense(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
});

expenseRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedExpense = await expenseService.deleteExpense(+id);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
});

expenseRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expenseService.updateExpense(id, data);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.json(updatedExpense);
});
