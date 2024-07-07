const verifyUserFields = (req, res, next) => {
  const {name} = req.body;

  if (!name.trim()) {
    return res.status(404).json({error: 'All fields is mandatory'});
  }

  return next();
}

module.exports = verifyUserFields;