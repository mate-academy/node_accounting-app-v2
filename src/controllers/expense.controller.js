const { ExpenseService } = require('../services/expense.service');
const { UserService } = require('../services/user.service');

function isInteger(value) {
  return typeof value === 'number' && Number.isInteger(value);
}

function isValidDateTimeString(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function isNonEmptyTrimmedString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function parseCategoriesParam(raw) {
  if (raw === undefined || raw === null || raw === '') {
    return undefined;
  }

  if (Array.isArray(raw)) {
    return raw
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return String(raw)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function hasExpenseListQueryFilters(query) {
  return (
    (query.userId !== undefined && query.userId !== '') ||
    (query.from !== undefined && query.from !== '') ||
    (query.to !== undefined && query.to !== '') ||
    (query.categories !== undefined && query.categories !== '')
  );
}

function validateCreateExpenseBody(body) {
  const { userId, spentAt, title, amount, category, note } = body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined ||
    note === undefined
  ) {
    return false;
  }

  if (!isInteger(userId)) {
    return false;
  }

  if (!isValidDateTimeString(spentAt)) {
    return false;
  }

  if (!isNonEmptyTrimmedString(title)) {
    return false;
  }

  if (!isInteger(amount)) {
    return false;
  }

  if (!isNonEmptyTrimmedString(category)) {
    return false;
  }

  return typeof note === 'string';
}

function validatePatchExpenseBody(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return false;
  }

  const allowed = new Set(['spentAt', 'title', 'amount', 'category', 'note']);

  for (const key of Object.keys(body)) {
    if (!allowed.has(key)) {
      return false;
    }
  }

  if ('spentAt' in body && !isValidDateTimeString(body.spentAt)) {
    return false;
  }

  if ('title' in body && !isNonEmptyTrimmedString(body.title)) {
    return false;
  }

  if ('amount' in body && !isInteger(body.amount)) {
    return false;
  }

  if ('category' in body && !isNonEmptyTrimmedString(body.category)) {
    return false;
  }

  return !('note' in body && typeof body.note !== 'string');
}

function createExpenseController(store) {
  const expenseService = ExpenseService(store);
  const userService = UserService(store);

  function getExpenses(req, res) {
    if (!hasExpenseListQueryFilters(req.query)) {
      return res.status(200).json(expenseService.getAll());
    }

    let userId;

    if (req.query.userId !== undefined && req.query.userId !== '') {
      const parsed = Number(req.query.userId);

      if (!Number.isInteger(parsed)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      userId = parsed;
    }

    const from =
      req.query.from !== undefined && req.query.from !== ''
        ? req.query.from
        : undefined;
    const to =
      req.query.to !== undefined && req.query.to !== ''
        ? req.query.to
        : undefined;

    if (from !== undefined && Number.isNaN(Date.parse(from))) {
      return res.status(400).json({ message: 'Invalid from' });
    }

    if (to !== undefined && Number.isNaN(Date.parse(to))) {
      return res.status(400).json({ message: 'Invalid to' });
    }

    const categories = parseCategoriesParam(req.query.categories);

    const expenses = expenseService.getAll({
      userId,
      from,
      to,
      categories,
    });

    return res.status(200).json(expenses);
  }

  function createExpense(req, res) {
    if (!validateCreateExpenseBody(req.body)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userService.getById(userId)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const expense = expenseService.create({
      userId,
      spentAt,
      title: title.trim(),
      amount,
      category: category.trim(),
      note,
    });

    return res.status(201).json(expense);
  }

  function findExpenseById(req, res) {
    const id = +req.params.id;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const expense = expenseService.getById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  }

  function deleteExpense(req, res) {
    const id = +req.params.id;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const removed = expenseService.remove(id);

    if (!removed) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.sendStatus(204);
  }

  function updateExpense(req, res) {
    const id = +req.params.id;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    if (!validatePatchExpenseBody(req.body)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const expense = expenseService.getById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const patch = {};

    if ('spentAt' in req.body) {
      patch.spentAt = req.body.spentAt;
    }

    if ('title' in req.body) {
      patch.title = req.body.title.trim();
    }

    if ('amount' in req.body) {
      patch.amount = req.body.amount;
    }

    if ('category' in req.body) {
      patch.category = req.body.category.trim();
    }

    if ('note' in req.body) {
      patch.note = req.body.note;
    }

    const updated = expenseService.patch(patch, id);

    return res.status(200).json(updated);
  }

  return {
    getExpenses,
    createExpense,
    findExpenseById,
    deleteExpense,
    updateExpense,
  };
}

module.exports = { createExpenseController };
