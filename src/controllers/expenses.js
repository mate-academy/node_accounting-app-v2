'use strict';

const expensesServices = require('../services/expenses');

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  try {
    const newRecord = expensesServices.create({
      userId,
      spentAt,
      title,
      amount,
      category,
    }, note);

    res.status(201).send(newRecord);
  } catch (_) {
    res.status(400).send('Bad request');
  }
};

const getOne = (req, res) => {
  const { recordId } = req.params;
  const foundedRecord = expensesServices.getById(+recordId);

  if (!foundedRecord) {
    res.status(404).send({ error: 'Not found' });

    return;
  }

  res.send(foundedRecord);
};

const remove = (req, res) => {
  const { recordId } = req.params;

  const status = expensesServices.remove(+recordId);

  if (!status) {
    res.status(404).send({ error: 'Not found' });

    return;
  }

  res.status(204).send({ response: 'Successfully delete' });
};

const update = (req, res) => {
  const { recordId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const statusRecord = expensesServices.update(+recordId, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!statusRecord.status) {
    res.status(statusRecord.statusCode).send();

    return;
  }

  res.send(statusRecord.record);
};

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const records = expensesServices.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.send(records);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
