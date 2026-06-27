const { Router } = require('express');

const ExpenseService = require('../utils/expenseService');
const ExpenseController = require('../utils/expenseController');
const requireFields = require('../utils/middleware');

const expenceController = new ExpenseController(new ExpenseService());

const expenseRouter = Router();

expenseRouter.get('/', expenceController.getByQuery);

expenseRouter.post(
  '/',
  requireFields({
    body: ['userId', 'spentAt', 'title', 'amount', 'category', 'note'],
  }),
  expenceController.createOne,
);

expenseRouter.get(
  '/:paramsId',
  requireFields({ params: ['paramsId'] }),
  expenceController.getOne,
);
expenseRouter.delete('/:paramsId', expenceController.deleteOne);
expenseRouter.patch('/:paramsId', expenceController.updateOne);

module.exports = { expenseRouter };
