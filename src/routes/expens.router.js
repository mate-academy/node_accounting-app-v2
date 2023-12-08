'use strict';

const express = require('express');
const expensController = require('../controllers/expens.controller');

const router = express.Router();

router.get('/', expensController.get);

router.get('/:id', expensController.getOne);

router.post('/', expensController.create);

router.patch('/:id', expensController.update);

router.delete('/:id', expensController.remove);

module.exports = {
  router,
};
