const validateExpenseInput = (req, res, next) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  next();
};

module.exports = {
  validateExpenseInput,
};
