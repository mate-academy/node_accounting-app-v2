'use strict';

const getExpenses = (req, res, expenseData) => {
  let resultado = [...expenseData];

  if (req.query.userId) {
    resultado = resultado.filter((e) => e.userId === Number(req.query.userId));
  }

  if (req.query.categories) {
    resultado = resultado.filter((e) => e.category === req.query.categories);
  }

  if (req.query.from && req.query.to) {
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);

    resultado = resultado.filter((e) => {
      const date = new Date(e.spentAt);

      return date >= from && date <= to;
    });
  }

  res.status(200).json(resultado);
};

const getExpenseById = (req, res, expenseData) => {
  const expense = expenseData.find((e) => e.id === Number(req.params.id));

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  res.status(200).json(expense);
};

const createExpense = (req, res, expenseData, userData, getNextId) => {
  if (!userData.find((u) => u.id === Number(req.body.userId))) {
    return res.status(400).json({ message: 'Não tem esse usuário' });
  }

  if (
    !req.body.title ||
    !req.body.amount ||
    !req.body.category ||
    !req.body.userId ||
    !req.body.spentAt
  ) {
    return res.status(400).json({ message: 'Falta campos' });
  }

  const data = {
    ...req.body,
    id: getNextId(),
  };

  expenseData.push(data);
  res.status(201).json(data);
};

const updateExpense = (req, res, expenseData) => {
  const expense = expenseData.find((e) => e.id === Number(req.params.id));

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  Object.assign(expense, req.body);
  res.status(200).json(expense);
};

const deleteExpense = (req, res, expenseData) => {
  const index = expenseData.findIndex((e) => e.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Not Found' });
  }

  expenseData.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
