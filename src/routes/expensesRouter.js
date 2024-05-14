const express = require('express');
const expensesController = require('../controllers/expensesController');

const router = express.Router();

router
  .route('/')
  .get(expensesController.getAll)
  .post(expensesController.create);

router
  .route('/:id')
  .get(expensesController.getOne)
  .patch(expensesController.update)
  .delete(expensesController.remove);

module.exports = {
  router,
};
