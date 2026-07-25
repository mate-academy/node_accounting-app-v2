'use strict';

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function createExpensesController(store) {
  const getExpenses = (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...store.expenses];

    if (!isBlank(userId)) {
      const parsedUserId = Number(userId);

      result = result.filter((expense) => expense.userId === parsedUserId);
    }

    if (!isBlank(categories)) {
      const categoryList = categories.split(',').map((c) => c.trim());
      const matchesCategory = (expense) =>
        categoryList.includes(expense.category);

      result = result.filter(matchesCategory);
    }

    if (!isBlank(from)) {
      const fromDate = new Date(from);

      result = result.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (!isBlank(to)) {
      const toDate = new Date(to);

      result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
    }

    res.json(result);
  };

  const getExpenseById = (req, res) => {
    const id = Number(req.params.id);
    const expense = store.expenses.find((e) => e.id === id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.json(expense);
  };

  const createExpense = (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      isBlank(userId) ||
      isBlank(spentAt) ||
      isBlank(title) ||
      isBlank(amount) ||
      isBlank(category)
    ) {
      res.status(400).send('Missing required expense fields');

      return;
    }

    const parsedUserId = Number(userId);
    const user = store.users.find((u) => u.id === parsedUserId);

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = {
      id: store.nextExpenseId++,
      userId: parsedUserId,
      spentAt,
      title,
      amount,
      category,
      note: note === undefined ? '' : note,
    };

    store.expenses.push(newExpense);

    res.status(201).json(newExpense);
  };

  const updateExpense = (req, res) => {
    const id = Number(req.params.id);
    const expense = store.expenses.find((e) => e.id === id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const parsedUserId = Number(userId);
      const user = store.users.find((u) => u.id === parsedUserId);

      if (!user) {
        res.status(400).send('User not found');

        return;
      }

      expense.userId = parsedUserId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.json(expense);
  };

  const deleteExpense = (req, res) => {
    const id = Number(req.params.id);
    const index = store.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    store.expenses.splice(index, 1);

    res.status(204).end();
  };

  return {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}

module.exports = {
  createExpensesController,
};
