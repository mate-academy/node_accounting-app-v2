const express = require('express');
const expenseController = require('../controllers/expense.controller.js');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', express.json(), expenseController.create);
router.delete('/:id', expenseController.remove);
router.patch('/:id', express.json(), expenseController.update);

module.exports = router;
