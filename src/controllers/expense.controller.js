'use strict';

const expenseService = require('../services/expense.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.params;

  res
    .status(200)
    .send(expenseService.get(userId, categories, from, to));
};

const post = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const result = expenseService.post(
    userId,
    spentAt,
    title,
    amount,
    category,
    note || '',
  );

  switch (result) {
    case 'No userId': {
      return res
        .send('No userId')
        .status(400);
    }

    case 'No spentAt': {
      return res
        .send('No spentAt')
        .status(400);
    }

    case 'No title': {
      return res
        .send('No title')
        .status(400);
    }

    case 'No amount': {
      return res
        .send('No amount')
        .status(400);
    }

    case 'No category': {
      return res
        .send('No category')
        .status(400);
    }

    case 'No expense to update': {
      return res
        .send('No expense to update')
        .status(400);
    }

    default: {
      res
        .status(201)
        .send(result);
    }
  }
};

const getById = (req, res) => {
  const { id } = req.params;

  const result = expenseService.getById(id);

  if (!id) {
    return res.status(400);
  }

  if (!result) {
    return res.status(404);
  }

  res
    .status(200)
    .send(result);
};

const remove = (req, res) => {
  const { id } = req.params;

  const result = expenseService.remove(id);

  if (!id) {
    return res.status(400);
  }

  if (!result) {
    return res.status(404);
  }

  res
    .status(200)
    .send(result);
};

const update = (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;

  const result = expenseService.update(
    spentAt,
    title,
    amount,
    category,
    note || '',
  );

  switch (result) {
    case 'No spentAt': {
      return res
        .send('No spentAt')
        .status(400);
    }

    case 'No title': {
      return res
        .send('No title')
        .status(400);
    }

    case 'No amount': {
      return res
        .send('No amount')
        .status(400);
    }

    case 'No category': {
      return res
        .send('No category')
        .status(400);
    }

    case 'No expense to update': {
      return res
        .send('No expense to update')
        .status(400);
    }

    default: {
      res
        .status(201)
        .send(result);
    }
  }
};

module.exports = {
  get,
  post,
  getById,
  remove,
  update,
};
