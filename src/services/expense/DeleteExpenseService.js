const expenseRepository = require('../../repositories/expenseRepository');

class DeleteExpenseService {
  execute(expenseId) {
    const updatedExpense = expenseRepository.destroy(expenseId);

    return updatedExpense;
  }
}

module.exports = DeleteExpenseService;
