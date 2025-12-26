const {
  create,
  deleteOne,
  getMore,
  getOne,
  update,
} = require('../controllers/expenses.controller.js');
const { Router } = require('express');

const expenseRouter = Router();

expenseRouter.get('/', getMore);
expenseRouter.post('/', create);
expenseRouter.get('/:id', getOne);
expenseRouter.delete('/:id', deleteOne);
expenseRouter.patch('/:id', update);

module.exports = { expenseRouter };
