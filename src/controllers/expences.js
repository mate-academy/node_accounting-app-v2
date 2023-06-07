'use strict';

const expencesService = require('../services/expences');

const add = (req, res) => {
  const userData = req.body;
  const newexpence = expencesService.create(userData);

  res.status(201).send(newexpence);
};

const getAll = (req, res) => {
  const expences = expencesService.filterAll(req.query);

  res.send(expences);
};

const getSingle = (req, res) => {
  const { expenceId } = req.params;
  const gotExpences = expencesService.getById(expenceId);

  if (!gotExpences) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(gotExpences);
};

const update = (req, res) => {
  const { expenceId } = req.params;
  const gotExpences = expencesService.getById(expenceId);

  if (!gotExpences) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  expencesService.update(expenceId, data);
  res.send(gotExpences);
};

const remove = (req, res) => {
  const { expenceId } = req.params;
  const gotExpences = expencesService.getById(expenceId);

  if (!gotExpences) {
    res.sendStatus(404);

    return;
  }

  expencesService.remove(expenceId);
  res.sendStatus(204);
};

module.exports = {
  add,
  getAll,
  getSingle,
  update,
  remove,
};
