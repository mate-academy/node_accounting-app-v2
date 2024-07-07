const { Router } = require('express');

const expenseRoutes = Router();

expenseRoutes.get('/');
expenseRoutes.get('/:id');
expenseRoutes.post('/');
expenseRoutes.patch('/:id');
expenseRoutes.delete('/:id');

module.exports = expenseRoutes;