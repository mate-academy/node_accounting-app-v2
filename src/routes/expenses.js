'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

router.use(express.json());
router.get('/', expenseController.getByQuery);
router.post('/', expenseController.createNew);
router.get('/:expenseId', expenseController.getById);
router.delete('/:expenseId', expenseController.removeById);
router.patch('/:expenseId', expenseController.editById);

module.exports = router;
