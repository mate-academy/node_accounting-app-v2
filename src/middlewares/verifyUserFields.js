const verifyUserFields = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'All fields is mandatory' });
  }

  return next();
};

module.exports = verifyUserFields;
