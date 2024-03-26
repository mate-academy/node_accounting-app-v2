const express = require('express');
const expenseController = require('../controllers/expense.controller.js');

const router = express.Router();

router.get('/expenses', expenseController.getAll);
router.get('/expenses/:id', expenseController.getOne);
router.post('/expenses', express.json(), expenseController.create);
router.delete('/expenses/:id', expenseController.remove);
router.patch('/expenses/:id', express.json(), expenseController.update);

module.exports = router;
