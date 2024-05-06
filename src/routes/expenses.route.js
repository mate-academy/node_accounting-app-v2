const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.create);
router.put('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = router;
