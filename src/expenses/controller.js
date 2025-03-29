const { expensesService } = require('./service');

const { users } = require('../users/service');

const expenseKeys = ['userId', 'title', 'amount', 'category', 'note'];

const getAllExpenses = async (req, res) => {
  const response = await expensesService.getAll();

  if (response) {
    res.status(200).json(response); // ✅ Використовуй res.json()
  } else {
    res.status(500).json('Server error');
  }
};

const addNewExpense = async (req, res) => {
  try {
    const newExpense = req.body;

    const isValid = expenseKeys.every((key) => newExpense.hasOwnProperty(key));

    if (!isValid || !users.some((user) => user.id === req.body.userId)) {
      res.status(400).json('Invalid data request');
    } else {
      const expObject = {
        userId: req.body.userId,
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        note: req.body.note,
      };

      const response = await expensesService.addNew(expObject);

      if (response) {
        res.status(201).json(response);
      } else {
        res.status(500).json('Server error');
      }
    }
  } catch {
    res.status(500).json('Server error');
  }
};

const findExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    if (!expenseId) {
      res.status(400).json('Invalid request data');

      return;
    }

    const response = await expensesService.getOneExpense(expenseId);

    if (!response) {
      res.status(404).json('Expense not found');
    } else {
      res.status(200).json(response);
    }
  } catch {
    res.status(500).json('Server error');
  }
};

const removeExpense = async (req, res) => {
  try {
    const removeId = req.params.id;

    if (!removeId) {
      res.status(400).json('Invalid data request');

      return;
    }

    const response = await expensesService.deleteExpense(removeId);

    if (!response) {
      return res.status(404).json('Expense not found');
    } else {
      res.status(204).send();
    }
  } catch {
    res.status(500).json('Server error');
  }
};

const changeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expenseBody = req.body;

    const isValid = expenseKeys.every((key) => expenseBody.hasOwnProperty(key));

    if (!expenseId || !isValid) {
      res.status(400).json('Invalid request data');

      return;
    }

    const response = await expensesService.updateExpense(
      expenseId,
      expenseBody,
    );

    if (!response) {
      res.status(404).json('Expense not found');
    } else {
      res.status(200).json(response);
    }
  } catch {
    res.status(500).json('Server error');
  }
};

module.exports = {
  getAllExpenses,
  addNewExpense,
  findExpense,
  removeExpense,
  changeExpense,
};
