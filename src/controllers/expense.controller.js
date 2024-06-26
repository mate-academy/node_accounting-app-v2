const {
  getFilteredExpenses,
  addExpense,
  getExpenseById,
  removeExpenseById,
  updateExpenseById,
} = require('../services/expenses.service');

const getFilteredExpense = (req, res) => {
  const { userId, from, to, categories } = req.query;

  try {
    const expense = getFilteredExpenses({
      userId,
      from,
      to,
      categories,
    });

    return res.status(200).send(expense);
  } catch (err) {
    return res.status(500).send('An error occurred while fetching expense.');
  }
};

const setExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const newExpense = addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(newExpense);
  } catch (err) {
    return res.status(500).send('An error occurred while sending expense.');
  }
};

const getCurrentExpense = (req, res) => {
  const { id } = req.params;

  try {
    const currentExpense = getExpenseById(id);

    return res.status(200).send(currentExpense);
  } catch (err) {
    return res.status(500).send('An error occurred while fetching expense.');
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  try {
    removeExpenseById(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send('An error occurred while deleting expense.');
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const currentExpense = getExpenseById(id);

  try {
    updateExpenseById(
      {
        spentAt,
        title,
        amount,
        category,
        note,
      },
      currentExpense,
    );

    return res.send(currentExpense);
  } catch (err) {
    return res.status(500).send('An error occurred while updating expense.');
  }
};

module.exports = {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
};
