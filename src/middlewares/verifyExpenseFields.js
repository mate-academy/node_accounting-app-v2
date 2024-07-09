const { isValidISODate } = require('../utils');

const verifyExpenseFields = (req, res, next) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (typeof userId !== 'number') {
    return res
      .status(400)
      .json({ error: 'The userId field must be a number.' });
  }

  if (
    typeof title !== 'string' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    return res
      .status(400)
      .json({ error: 'The title, category, and note fields must be strings.' });
  }

  if (isNaN(amount) || amount <= 0) {
    return res
      .status(400)
      .json({ error: 'The amount field must be a number greater than zero.' });
  }

  if (!isValidISODate(spentAt)) {
    return res.status(400).json({
      error:
        'The spentAt field must be in a valid ISO 8601 date and time format.',
    });
  }

  return next();
};

module.exports = verifyExpenseFields;
