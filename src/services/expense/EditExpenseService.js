const expenseRepository = require('../../repositories/expenseRepository');

class EditExpenseService {
  execute(expenseId, expenseData) {
    const expense = expenseRepository.update(expenseId, expenseData);

    return expense;
  }
}

module.exports = EditExpenseService;