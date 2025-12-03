function listExpenses(req, res) {
  const expenses = req.app.locals.expenses;
  let results = [...expenses];

  const { userId, categories, from, to } = req.query;

  if (userId) {
    results = results.filter((e) => e.userId === parseInt(userId));
  }

  if (categories) {
    const categoryList = categories.split(',');

    results = results.filter((e) => categoryList.includes(e.category));
  }

  if (from) {
    results = results.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    results = results.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.json(results);
}

function listExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const id = parseInt(req.params.id);

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
}

function createExpenses(req, res) {
  const expenses = req.app.locals.expenses;
  const users = req.app.locals.users;

  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    return res.status(400).json({ message: 'Missing parameter' });
  }

  const userExists = users.find((u) => u.id === userId);

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  const expense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(expense);

  res.status(201).json(expense);
}

function putExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const users = req.app.locals.users;

  const id = parseInt(req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    return res.status(400).json({ message: 'Missing parameter' });
  }

  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const userExists = users.find((u) => u.id === userId);

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  expenses[index] = {
    ...expenses[index],
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  res.json(expenses[index]);
}

function patchExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const users = req.app.locals.users;

  const id = parseInt(req.params.id);
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (req.body.userId) {
    const userExists = users.find((u) => u.id === req.body.userId);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }
  }

  expenses[index] = { ...expenses[index], ...req.body };

  res.json(expenses[index]);
}

function deleteExpensesById(req, res) {
  const expenses = req.app.locals.expenses;

  const id = parseInt(req.params.id);
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  listExpenses,
  listExpensesById,
  createExpenses,
  putExpensesById,
  patchExpensesById,
  deleteExpensesById,
};
