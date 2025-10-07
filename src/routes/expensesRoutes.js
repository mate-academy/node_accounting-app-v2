const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', expensesController.create);
router.patch('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = router;
