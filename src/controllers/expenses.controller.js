import * as expensesService from '../services/expenses.service.js';

export function getAll(req, res) {
  const { userId, categories, from, to } = req.query;
  let query = {
    userId,
    categories,
    from,
    to,
  };

  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key];
    }
  }

  if (Object.keys(query).length === 0) {
    query = null;
  }

  const users = expensesService.getAll(query);

  res.json(users);
}

export function getById(req, res) {
  const expenseId = Number(req.params.id);

  if (!(expenseId >= 0)) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(expenseId);

  if (expense) {
    res.json(expense);
  } else {
    res.sendStatus(404);
  }
}

export function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (Object.values(expense).some((value) => value === undefined)) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.create(expense);

  if (newExpense) {
    res.status(201).json(newExpense);
  } else {
    res.sendStatus(400);
  }
}

export function deleteById(req, res) {
  const expense = expensesService.deleteById(Number(req.params.id));

  if (expense) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

export function update(req, res) {
  const id = Number(req.params.id);
  const fields = ['spentAt', 'title', 'amount', 'category', 'note'];
  const updateExpense = {};

  for (const key of fields) {
    if (req.body[key] !== undefined) {
      updateExpense[key] = req.body[key];
    }
  }

  const expense = expensesService.update(id, updateExpense);

  if (expense) {
    res.send(expense);
  } else {
    res.sendStatus(404);
  }
}
