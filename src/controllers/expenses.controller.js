const expensesModel = require('../models/expenses.model');

function getAllExpenses(req, res) {
  try {
    const expenses = expensesModel.getAllExpenses();

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрати' });
  }
}

function getExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const expense = expensesModel.getExpense(expId);

    if (!expId || !expense) {
      return res.status(400).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрату' });
  }
}

function createExpense(req, res) {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: 'Не передано тіло запиту' });
    }

    const newExpense = expensesModel.createExpense(body);

    if (!newExpense) {
      return res.status(500).json({ message: 'Нову витрату не створено' });
    }

    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити витрату' });
  }
}

function removeExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const removedExpense = expensesModel.removeExpense(expId);

    if (!removedExpense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити витрату' });
  }
}

function updateExpense(req, res) {
  try {
    const body = req.body;
    const expId = +req.params.expId;

    if (!body) {
      return res.status(400).json({ error: 'Body is required' });
    } else if (!expId) {
      return res.status(400).json({ error: 'Expense id is required in URL' });
    }

    const updatedExpense = expensesModel.editExpense(expId, body);

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
