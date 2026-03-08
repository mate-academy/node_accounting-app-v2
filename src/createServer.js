const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const categories = [];
  const expenses = [];

  let nextUserId = 1;
  let nextCategoryId = 1;
  let nextExpenseId = 1;

  const isValidName = (value) =>
    typeof value === 'string' && value.trim() !== '';
  const isValidNumber = (value) =>
    typeof value === 'number' && Number.isFinite(value);

  // Users

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!isValidName(name)) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    const user = {
      id: nextUserId++,
      name: name.trim(),
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const userIdFromParams = Number(req.params.id);
    const user = users.find(
      (candidateUser) => candidateUser.id === userIdFromParams,
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const userIdFromParams = Number(req.params.id);
    const user = users.find(
      (candidateUser) => candidateUser.id === userIdFromParams,
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name } = req.body;

    if (!isValidName(name)) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    Object.assign(user, { name: name.trim() });

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userIdFromParams = Number(req.params.id);
    const userIndex = users.findIndex(
      (candidateUser) => candidateUser.id === userIdFromParams,
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    for (
      let expenseIndex = expenses.length - 1;
      expenseIndex >= 0;
      expenseIndex -= 1
    ) {
      if (expenses[expenseIndex].userId === userIdFromParams) {
        expenses.splice(expenseIndex, 1);
      }
    }

    return res.sendStatus(204);
  });

  // Categories

  app.post('/categories', (req, res) => {
    const { name } = req.body;

    if (!isValidName(name)) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    const category = {
      id: nextCategoryId++,
      name: name.trim(),
    };

    categories.push(category);

    return res.status(201).json(category);
  });

  app.get('/categories', (req, res) => {
    return res.json(categories);
  });

  app.get('/categories/:id', (req, res) => {
    const categoryIdFromParams = Number(req.params.id);
    const category = categories.find(
      (candidateCategory) => candidateCategory.id === categoryIdFromParams,
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  });

  app.patch('/categories/:id', (req, res) => {
    const categoryIdFromParams = Number(req.params.id);
    const category = categories.find(
      (candidateCategory) => candidateCategory.id === categoryIdFromParams,
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { name } = req.body;

    if (!isValidName(name)) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    Object.assign(category, { name: name.trim() });

    return res.json(category);
  });

  app.delete('/categories/:id', (req, res) => {
    const categoryIdFromParams = Number(req.params.id);
    const categoryIndex = categories.findIndex(
      (candidateCategory) => candidateCategory.id === categoryIdFromParams,
    );

    if (categoryIndex === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    categories.splice(categoryIndex, 1);

    return res.sendStatus(204);
  });

  // Expenses

  app.post('/expenses', (req, res) => {
    const {
      userId: expenseUserId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      !isValidNumber(expenseUserId) ||
      typeof spentAt !== 'string' ||
      !Number.isFinite(Date.parse(spentAt)) ||
      !isValidName(title) ||
      !isValidNumber(amount) ||
      !isValidName(category) ||
      typeof note !== 'string'
    ) {
      return res.status(400).json({
        error: [
          'Missing required fields:',
          'userId, spentAt, title, amount, category, note',
        ].join(' '),
      });
    }

    const userExists = users.some(
      (candidateUser) => candidateUser.id === expenseUserId,
    );

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = {
      id: nextExpenseId++,
      userId: expenseUserId,
      spentAt,
      title: title.trim(),
      amount,
      category: category.trim(),
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories: categoriesQuery } = req.query;
    const requestedUserId = typeof userId === 'string' ? Number(userId) : null;
    const hasUserFilter = Number.isFinite(requestedUserId);

    const fromTimestamp =
      typeof from === 'string' ? Date.parse(from) : Number.NaN;
    const hasFromFilter = Number.isFinite(fromTimestamp);

    const toTimestamp = typeof to === 'string' ? Date.parse(to) : Number.NaN;
    const hasToFilter = Number.isFinite(toTimestamp);

    let categoryFilters = [];

    if (typeof categoriesQuery === 'string') {
      categoryFilters = categoriesQuery
        .split(',')
        .map((categoryName) => categoryName.trim())
        .filter((categoryName) => categoryName !== '');
    }

    const hasCategoryFilter = categoryFilters.length > 0;

    const filteredExpenses = expenses.filter((candidateExpense) => {
      if (hasUserFilter && candidateExpense.userId !== requestedUserId) {
        return false;
      }

      const expenseTimestamp = Date.parse(candidateExpense.spentAt);

      if (hasFromFilter && expenseTimestamp < fromTimestamp) {
        return false;
      }

      if (hasToFilter && expenseTimestamp > toTimestamp) {
        return false;
      }

      if (
        hasCategoryFilter &&
        !categoryFilters.includes(candidateExpense.category)
      ) {
        return false;
      }

      return true;
    });

    return res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseIdFromParams = Number(req.params.id);
    const expense = expenses.find(
      (candidateExpense) => candidateExpense.id === expenseIdFromParams,
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.json(expense);
  });

  const updateExpenseById = (req, res) => {
    const expenseIdFromParams = Number(req.params.id);
    const expense = expenses.find(
      (candidateExpense) => candidateExpense.id === expenseIdFromParams,
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'userId')) {
      const { userId: updatedUserId } = req.body;

      if (!isValidNumber(updatedUserId)) {
        return res.status(400).json({ error: 'Invalid userId' });
      }

      const updatedUserExists = users.some(
        (candidateUser) => candidateUser.id === updatedUserId,
      );

      if (!updatedUserExists) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'spentAt')) {
      const { spentAt: updatedSpentAt } = req.body;

      if (
        typeof updatedSpentAt !== 'string' ||
        !Number.isFinite(Date.parse(updatedSpentAt))
      ) {
        return res.status(400).json({ error: 'Invalid spentAt' });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
      const { title: updatedTitle } = req.body;

      if (!isValidName(updatedTitle)) {
        return res.status(400).json({ error: 'Invalid title' });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'amount')) {
      const { amount: updatedAmount } = req.body;

      if (!isValidNumber(updatedAmount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'category')) {
      const { category: updatedCategory } = req.body;

      if (!isValidName(updatedCategory)) {
        return res.status(400).json({ error: 'Invalid category' });
      }
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'note')) {
      const { note: updatedNote } = req.body;

      if (typeof updatedNote !== 'string') {
        return res.status(400).json({ error: 'Invalid note' });
      }
    }

    const expensePatch = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(expensePatch, 'title')) {
      expensePatch.title = expensePatch.title.trim();
    }

    if (Object.prototype.hasOwnProperty.call(expensePatch, 'category')) {
      expensePatch.category = expensePatch.category.trim();
    }

    Object.assign(expense, expensePatch);

    return res.json(expense);
  };

  app.patch('/expenses/:id', updateExpenseById);
  app.put('/expenses/:id', updateExpenseById);

  app.delete('/expenses/:id', (req, res) => {
    const expenseIdFromParams = Number(req.params.id);
    const expenseIndex = expenses.findIndex(
      (candidateExpense) => candidateExpense.id === expenseIdFromParams,
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);

    return res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
