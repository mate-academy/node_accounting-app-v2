const userService = require('../services/user.service');
const expenseService = require('../services/expense.service');

const isUserExist = (userId, res) => {
  if (!userService.getById(userId)) {
    res.status(400).send('User not found');

    return true;
  }
};

const isExpenseExist = (id, res) => {
  if (!expenseService.getExpenseById(id)) {
    res.status(404).send('Expense with this id not found');

    return true;
  }
};

const validateRequestBodyFields = ({
  userId,
  title,
  amount,
  category,
  note,
  res,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    res.status(400).send('provide userId');

    return true;
  }

  if (!title || typeof title !== 'string') {
    res
      .status(400)
      .send('Invalid request: "title" is required and must be a string.');

    return true;
  }

  if (typeof amount !== 'number') {
    res.status(400).send('Invalid request: "amount" must be a number.');

    return true;
  }

  if (!category || typeof category !== 'string') {
    res
      .status(400)
      .send('Invalid request: "category" is required and must be a string.');

    return true;
  }

  if (!note || typeof note !== 'string') {
    res
      .status(400)
      .send('Invalid request: "note" is required and must be a note.');

    return true;
  }
};

module.exports = {
  isUserExist,
  isExpenseExist,
  validateRequestBodyFields,
};
