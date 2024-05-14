const expenseService = require('../services/expense.service');

const isExpenseExist = (id) => {
  if (!expenseService.getExpenseById(id)) {
    return true;
  }
};

const validateRequestBodyFields = ({
  userId,
  title,
  amount,
  category,
  note,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    throw new Error('provide userId');
  }

  if (!title || typeof title !== 'string') {
    throw new Error(
      'Invalid request: "title" is required and must be a string.',
    );
  }

  if (typeof amount !== 'number') {
    throw new Error('Invalid request: "amount" must be a number.');
  }

  if (!category || typeof category !== 'string') {
    throw new Error(
      'Invalid request: "category" is required and must be a string.',
    );
  }

  if (!note || typeof note !== 'string') {
    throw new Error('Invalid request: "note" is required and must be a note.');
  }
};

module.exports = {
  isExpenseExist,
  validateRequestBodyFields,
};
