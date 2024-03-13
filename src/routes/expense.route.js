'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expense.controllers.js');

const { get, getOne, create, remove, update } = expenseControllers;

const router = express.Router();

router.get('/', get);
router.get('/:id', getOne);
router.post('/', create);
router.delete('/:id', remove);
router.patch('/:id', update);

module.exports = router;
