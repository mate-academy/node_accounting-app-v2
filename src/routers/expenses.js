const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);
router.post('/', express.json(), expensesController.addNew);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.remove);
router.patch('/:id', express.json(), expensesController.update);

module.exports = router;
