const expenseRepository = require('../../repositories/expenseRepository');

class GetExpenseService {
  execute(expenseId) {
    const expense = expenseRepository.findByPk(expenseId);
    
    return expense;
  }
}

module.exports = GetExpenseService;