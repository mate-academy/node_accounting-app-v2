'use strict';

const {
  expenses,
  findExpense,
  findUser,
  nextExpenseId,
} = require('../db/memory');

const createExpense = (req, res) => {
  const body = req.body || {};

  const required = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

  for (const key of required) {
    if (typeof body[key] === 'undefined') {
      return res.status(400).json({ message: `${key} is required` });
    }
  }

  const userId = Number(body.userId);

  if (!Number.isFinite(userId) || !findUser(userId)) {
    return res.status(400).json({ message: 'user not found' });
  }

  const expense = {
    id: nextExpenseId(),
    userId,
    spentAt: String(body.spentAt),
    title: String(body.title),
    amount: Number(body.amount),
    category: String(body.category),
    note: String(body.note),
  };

  expenses.push(expense);

  return res.status(201).json(expense);
};

const listExpenses = (req, res) => {
  const userIdQ = req.query.userId;
  const fromQ = req.query.from;
  const toQ = req.query.to;
  const categoriesQ = req.query.categories;

  let result = expenses.slice();

  if (typeof userIdQ !== 'undefined') {
    const uid = Number(userIdQ);

    result = result.filter((e) => e.userId === uid);
  }

  if (fromQ || toQ) {
    const fromMs = fromQ ? Date.parse(fromQ) : Number.NEGATIVE_INFINITY;
    const toMs = toQ ? Date.parse(toQ) : Number.POSITIVE_INFINITY;

    result = result.filter((e) => {
      const t = Date.parse(e.spentAt);

      return t >= fromMs && t <= toMs;
    });
  }

  if (categoriesQ) {
    const set = new Set(
      String(categoriesQ)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    );

    result = result.filter((e) => set.has(e.category));
  }

  return res.json(result);
};

const getExpense = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const exp = findExpense(id);

  if (!exp) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.json(exp);
};

const updateExpense = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const exp = findExpense(id);

  if (!exp) {
    return res.status(404).json({ message: 'Not found' });
  }

  const patch = req.body || {};

  if (typeof patch.userId !== 'undefined') {
    const uid = Number(patch.userId);

    if (!Number.isFinite(uid) || !findUser(uid)) {
      return res.status(400).json({ message: 'user not found' });
    }
    exp.userId = uid;
  }

  if (typeof patch.spentAt !== 'undefined') {
    exp.spentAt = String(patch.spentAt);
  }

  if (typeof patch.title !== 'undefined') {
    exp.title = String(patch.title);
  }

  if (typeof patch.amount !== 'undefined') {
    exp.amount = Number(patch.amount);
  }

  if (typeof patch.category !== 'undefined') {
    exp.category = String(patch.category);
  }

  if (typeof patch.note !== 'undefined') {
    exp.note = String(patch.note);
  }

  return res.json(exp);
};

const deleteExpense = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const idx = expenses.findIndex((e) => e.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  expenses.splice(idx, 1);

  return res.status(204).end();
};

module.exports = {
  createExpense,
  listExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
