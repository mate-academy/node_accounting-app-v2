const expenseRepository = require('../../repositories/expenseRepository');

class GetAllExpensesService {
  execute(filters) {
    const expenses = expenseRepository.findAll(filters);

    return expenses;
  }
}

module.exports = GetAllExpensesService;
