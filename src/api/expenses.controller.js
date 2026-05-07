const { services: expensesServices } = require('./expenses.service');
const { services: userServices } = require('./users.service');

const controller = {
  getExpenses(req, res) {
    let expenses = expensesServices.getExpenses();

    const { userId, from, to, categories } = req.query;

    if (userId) {
      const user = userServices.getUser(parseInt(userId, 10));

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      expenses = expenses.filter(
        (expense) => expense.userId === parseInt(userId, 10),
      );
    }

    if (from || to) {
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      expenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);

        if (fromDate && expenseDate < fromDate) {
          return false;
        }

        if (toDate && expenseDate > toDate) {
          return false;
        }

        return true;
      });
    }

    if (categories) {
      const categoriesArray = categories.split(',').map((cat) => cat.trim());

      expenses = expenses.filter(
        (expense) => categoriesArray.indexOf(expense.category) !== -1,
      );
    }

    res.json(expenses);
  },
  getExpense(req, res) {
    const { id } = req.params;
    const expense = expensesServices.getExpense(parseInt(id, 10));

    if (expense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  },
  createExpense(req, res) {
    const expense = req.body;

    if (!expense.userId) {
      res.status(400).json({ message: 'userId is required' });

      return;
    }

    const user = userServices.getUser(expense.userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const newExpense = expensesServices.createExpense(expense);

    res.status(201).json(newExpense);
  },
  deleteExpense(req, res) {
    const { id } = req.params;
    const deletedExpense = expensesServices.deleteExpense(parseInt(id, 10));

    if (deletedExpense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.status(204).end();
  },
  updateExpense(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    const currentExpense = expensesServices.getExpense(parseInt(id, 10));

    if (currentExpense === null) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    if (Object.keys(updatedData).length === 0) {
      res.status(400).json({ message: 'No data provided for update' });

      return;
    }

    const updatedExpense = expensesServices.updateExpense(
      parseInt(id, 10),
      updatedData,
    );

    res.json(updatedExpense);
  },
};

module.exports = {
  controller,
};
