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

  const selectedExpenses = services.getExpencesByUserId(userId);

  if (!selectedExpenses.length || !userExists) {
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

  const notValidData = !spentAt || !title || !amount || !category;

  if (notValidData) {
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

  const {
    spentAt,
    title,
    amount,
    category,
    note
  } = req.body;

  const notValidData = [ spentAt, title, category, note ]
    .some(string => typeof string !== 'string')
    || typeof amount !== 'number'
    || !foundExpense;

  if (notValidData) {
    res.sendStatus(404)
    return;
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
