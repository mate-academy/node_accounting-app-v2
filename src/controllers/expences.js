'use strict';

import * as services from '../services/services.js';


export const getAll = (req, res) => {
  const expences = services.getExpenses();

  res.send(expences);
};

export const getOne = (req, res) => {
  const { expenceId } = req.params;

  const selectedExpence = services.getExpenceById(expenceId)

  if (!selectedExpence) {
    res.sendStatus(400);
    return;
  }

  res.send(selectedExpence);
}

export const getFromUser = (req, res) => {
  const { userId } = req.params;

  const userExists = services.getUserById(userId);

  if (!userExists) {
    res.sendStatus(404);
    return;
  }

  const selectedExpenses = services.getExpencesByUserId(userId);

  if (!selectedExpenses.length) {
    res.sendStatus(404);
    return;
  }

  res.send(selectedExpenses);
}

export const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  } = req.body;

  const userExists = services.getUserById(userId);

  if (!userExists) {
    res.sendStatus(404);
    return;
  }

  if (!spentAt || !title || !amount || !category) {
    res.sendStatus(400);
    return;
  }

  const newExpense = services.createExpence({
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  });


  res.send(newExpense);
}

export const remove = (req, res) => {
  const { expenceId } = req.params;

  const foundExpense = services.getExpenceById(expenceId);


  if (!foundExpense) {
    res.sendStatus(404);
    return;
  }

  services.removeExpense(expenceId);
  res.sendStatus(200);
}

export const update = (req, res) => {
  const { expenceId } = req.params;

  const foundExpense = services.getExpenceById(expenceId)

  if (!foundExpense) {
    res.sendStatus(404)
    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note
  } = req.body;

  if (typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string') {
    console.log('this is he')
    res.sendStatus(404)
    return
  }

  services.amendExpense({
    id: expenceId,
    spentAt,
    title,
    amount,
    category,
    note
  })

  res.send(foundExpense);
}
