'use strict';

const { expenseController } = require('../controllers/expense.js');
const { expenseService } = require('../service/expense.js');

function initExpenseRouter(app) {
  app.post('/', expenseController.add);

  app.get('/', expenseController.getAll);

  app.get('/:expenseId', expenseController.getOne);

  app.patch('/:expenseId', expenseController.update);

  app.delete('/:expenseId', expenseController.remove);

  expenseService.init();
}

module.exports = {
  initExpenseRouter,
};
