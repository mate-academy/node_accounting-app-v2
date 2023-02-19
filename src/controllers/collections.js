'use strict';

const collectionServices = require('./services/collections');

const getAllExpenses = (req, res) => {
  res.send(collectionServices.getCollection().expenses);
};

module.exports = {
  getAllExpenses,
};
