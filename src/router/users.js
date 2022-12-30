'use strict';

const {
  initUsers,
} = require('../services/users');

const {
  getMany,
  getOne,
  addNew,
  remove,
  update,
} = require('../controllers/users');

const express = require('express');

const router = express.Router();

function createUsers(app) {
  app.use('/users', router);
  initUsers();

  router.get('/', getMany);

  router.get('/:userId', getOne);

  router.post('/', express.json(), addNew);

  router.delete('/:userId', remove);

  router.patch('/:userId', express.json(), update);
}

module.exports = { createUsers };
