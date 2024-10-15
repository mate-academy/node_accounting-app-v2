const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const filteredExpenses = expensesService.getAllExpenses(
      userId,
      categories,
      from,
      to,
    );

    res.status(200).json(filteredExpenses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOne = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (!spentAt) {
    return res.status(400).json({ error: 'SpentAt (date) is required' });
  }

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  if (!note) {
    return res.status(400).json({ error: 'Note is required' });
  }

  const user = userService.getUserById(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
    const expense = expensesService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expensesService.deleteExpense(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const update = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expensesService.getExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const updatedExpense = expensesService.updateExpense(id, req.body);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Failed to update expense' });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
