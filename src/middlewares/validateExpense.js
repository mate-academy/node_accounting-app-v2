const { usersService } = require('../services/users/users.service');

const validateExpense = (req, res, next) => {
  const { userId, spentAt, title, amount, category } = req.body;

  const user = usersService.getById(userId ?? 0);

  if (!userId || !spentAt || !title || !amount || !category || !user) {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = {
  validateExpense,
};
