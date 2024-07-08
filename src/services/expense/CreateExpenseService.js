const expenseRepository = require('../../repositories/expenseRepository');

class CreateExpenseService {
  execute(expenseData) {
    const expense = expenseRepository.create(expenseData);

    return expense;
  }
}

module.exports = CreateExpenseService;
