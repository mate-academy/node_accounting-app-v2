const express = require('express');
const router = express.Router();

const expensesController = require('../controllers/expenses.controller');

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', expensesController.create);
router.delete('/:id', expensesController.remove);
router.patch('/:id', expensesController.update);

module.exports = router;
