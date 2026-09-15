const expenseService = require('./expenses.service.js');

exports.getExpenses = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.status(200).json(expenses);
};

exports.getExpense = (req, res) => {
  const expense = expenseService.getById(Number(req.params.id));

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.status(200).json(expense);
};

exports.createExpense = (req, res) => {
  const { userId, amount, spentAt, title, category, note } = req.body;

  if (
    !title ||
    !title.trim() ||
    amount === undefined ||
    !spentAt ||
    !category
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.create({
    userId,
    amount,
    spentAt,
    title,
    category,
    note,
  });

  if (!expense) {
    res.status(400).json({ error: 'Invalid expense data' });

    return;
  }

  res.status(201).json(expense);
};

exports.updateExpense = (req, res) => {
  const expense = expenseService.getById(Number(req.params.id));
  const changes = req.body;

  if (!expense) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  const title = changes.title ?? expense.title;
  const amount = changes.amount ?? expense.amount;
  const spentAt = changes.spentAt ?? expense.spentAt;
  const category = changes.category ?? expense.category;

  if (
    !title ||
    !title.trim() ||
    amount === undefined ||
    !spentAt ||
    !category
  ) {
    res.sendStatus(400);

    return;
  }

  res.status(200).json(expenseService.update(expense.id, changes));
};

exports.removeExpense = (req, res) => {
  const deleted = expenseService.remove(Number(req.params.id));

  if (!deleted) {
    res.status(404).json({ error: 'Expense not found' });

    return;
  }

  res.sendStatus(204);
};
