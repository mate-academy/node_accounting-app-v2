import * as expensesService from '../services/expenses.service.js';

export const get = (req, res) => {
  res.send(expensesService.getAll());
};

export const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.status(200).json(expense);
};

export const create = (req, res) => {
  const { userId, title, amount, category, note } = req.body;

  if (!userId || !title || !amount) {
    return res
      .status(400)
      .json({ error: 'userId, title, and amount are required' });
  }

  const newExpense = expensesService.create({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

export const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

export const update = (req, res) => {
  const { id } = req.params;
  const { userId, title, amount, category, note } = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    return res
      .status(400)
      .json({ error: 'userId, title, and amount are required for update' });
  }

  const updatedExpense = expensesService.update({
    id,
    userId,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};
