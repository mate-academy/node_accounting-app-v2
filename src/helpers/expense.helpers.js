const userService = require('../services/user.service');
const expenseService = require('../services/expense.service');

const isUserExist = (userId, res) => {
  const user = userService.getUserById(userId);

  if (!user) {
    res.status(400).send('User not found');

    return true;
  }
};

const isExpenseExist = (id, res) => {
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return true;
  }
};

const validateRequestData = ({
  userId,
  title,
  amount,
  category,
  note,
  res,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    res.status(400).send('Invalid request: "userId" is required.');

    return true;
  }

  if (!title || typeof title !== 'string') {
    res.status(400).send('Title is required and must be a string.');

    return true;
  }

  if (typeof amount !== 'number') {
    res.status(400).send('Amount is required and must be a number.');

    return true;
  }

  if (!category || typeof category !== 'string') {
    res.status(400).send('Category is required and must be a string.');

    return true;
  }

  if (!note || typeof note !== 'string') {
    res.status(400).send('Note is required and must be a string.');

    return true;
  }
};

module.exports = {
  isUserExist,
  isExpenseExist,
  validateRequestData,
};
