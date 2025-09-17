function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = [...req.app.locals.expenses];

  if (userId) {
    const id = Number(userId);

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    filteredExpenses = filteredExpenses.filter((e) => e.userId === id);
  }

  if (categories) {
    const categoriesArr = categories.split(',').map((c) => c.trim());

    filteredExpenses = filteredExpenses.filter(
      (e) => categoriesArr.includes(e.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from) {
    const fromDate = new Date(from);

    if (!Number.isFinite(fromDate.getTime())) {
      return res.sendStatus(400);
    }

    const fromTimestamp = fromDate.getTime();

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt).getTime() >= fromTimestamp,
    );
  }

  if (to) {
    const toDate = new Date(to);

    if (!Number.isFinite(toDate.getTime())) {
      return res.sendStatus(400);
    }

    const toTimestamp = toDate.getTime();

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt).getTime() <= toTimestamp,
    );
  }

  res.send(filteredExpenses);
}

function createExpenses(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    res.sendStatus(400);

    return;
  }

  const numericUserId = Number(userId);
  const numericAmount = Number(amount);

  if (isNaN(numericUserId) || isNaN(numericAmount)) {
    return res.sendStatus(400);
  }

  const userExists = req.app.locals.users.some((u) => u.id === numericUserId);

  if (!userExists) {
    return res.sendStatus(400);
  }

  const date = new Date(spentAt);

  if (isNaN(date)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: req.app.locals.nextExpenseId++,
    userId: Number(userId),
    spentAt: date.toISOString(),
    title,
    amount: Number(amount),
    category,
    note: note || '',
  };

  req.app.locals.expenses.push(newExpense);

  res.status(201).send(newExpense);
}

function getExpensesById(req, res) {
  const { id } = req.params;

  const expense = req.app.locals.expenses.find((e) => e.id === Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

function deleteExpenses(req, res) {
  const { id } = req.params;

  const expenseIndex = req.app.locals.expenses.findIndex(
    (e) => e.id === Number(id),
  );

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  req.app.locals.expenses.splice(expenseIndex, 1);
  res.sendStatus(204);
}

function updateExpenses(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = req.app.locals.expenses.find((e) => e.id === Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt);

    if (!Number.isFinite(date.getTime())) {
      return res.sendStatus(400);
    }
    expense.spentAt = date.toISOString();
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    if (isNaN(Number(amount))) {
      res.sendStatus(400);

      return;
    }
    expense.amount = Number(amount);
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  res.send(expense);
}

module.exports = {
  getExpenses,
  createExpenses,
  getExpensesById,
  deleteExpenses,
  updateExpenses,
};
