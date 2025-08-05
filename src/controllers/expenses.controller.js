const expensesModel = require('../models/expenses.model');

async function getAllExpenses(req, res) {
  try {
    const expenses = await expensesModel.getAllExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрати' });
  }
}

async function getExpense(req, res) {
  try {
    const expId = +req.params.expId;

    if (!expId) {
      return res.status(400).json({ message: 'ID витрати не вказано' });
    }

    const expense = await expensesModel.getExpense(expId);

    if (!expense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрату' });
  }
}

async function createExpense(req, res) {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: 'Не передано тіло запиту' });
    }

    const newExpense = await expensesModel.createExpense(body);

    if (!newExpense) {
      return res.status(500).json({ message: 'Нову витрату не створено' });
    }

    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити витрату' });
  }
}

async function removeExpense(req, res) {
  try {
    const expId = +req.params.expId;

    if (!expId) {
      return res.status(400).json({ message: 'Expense id is required in URL' });
    }

    const removedExpense = await expensesModel.removeExpense(expId);

    if (!removedExpense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити витрату' });
  }
}

async function updateExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const body = req.body;

    if (!expId) {
      return res.status(400).json({ error: 'Expense id is required in URL' });
    }

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: 'Body is required' });
    }

    const updatedExpense = await expensesModel.editExpense(expId, body);

    if (!updatedExpense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити витрату' });
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
