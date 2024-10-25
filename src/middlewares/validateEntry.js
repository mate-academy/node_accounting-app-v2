const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const validateEntry = (entryType) => {
  return (req, res, next) => {
    const { id } = req.params;
    const funcTypes = {
      user: userService.getById,
      expense: expenseService.getById,
    };

    const entry = funcTypes[entryType](id);

    if (!entry) {
      res.sendStatus(404);
    } else {
      req.entry = entry;
      next();
    }
  };
};

module.exports = { validateEntry };
