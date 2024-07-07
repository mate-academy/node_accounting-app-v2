const verifyIfIdIsANumber = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res
      .status(404)
      .json({ error: 'The id must necessarily be a number' });
  }

  return next();
};

module.exports = verifyIfIdIsANumber;
