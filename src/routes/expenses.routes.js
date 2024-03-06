'use strict';

const Router = require('express');

const expenseController = require('../controllers/expense.controller');

const {
  reqBodyValidation, reqQueryValidation,
} = require('../middleware/validation.middleware');

const {
  expensePostSchema, expensePatchSchema, expenseQuerySchema,
} = require('../libs/validation.schemas/expense.schemas');

const router = Router();

router.get('/', reqQueryValidation(expenseQuerySchema), expenseController.get);

router.get('/:id', expenseController.getOne);

router.delete('/:id', expenseController.remove);

router.post(
  '/',
  reqBodyValidation(expensePostSchema),
  expenseController.create
);

router.patch(
  '/:id',
  reqBodyValidation(expensePatchSchema),
  expenseController.update
);

module.exports = router;
