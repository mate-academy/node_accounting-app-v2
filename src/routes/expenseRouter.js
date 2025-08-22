const express = require('express');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/', expenseController.getByFilter);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.delete);

module.exports = router;
