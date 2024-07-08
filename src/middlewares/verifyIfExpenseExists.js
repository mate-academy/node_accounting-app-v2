const expenseRepository = require('../repositories/expenseRepository');

const verifyIfExpenseExists = (req, res, next) => {
  const { id } = req.params;

  const expenseExists = expenseRepository
    .findAll()
    .find((expense) => expense.id === Number(id));

  if (!expenseExists) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  return next();
};

module.exports = verifyIfExpenseExists;
