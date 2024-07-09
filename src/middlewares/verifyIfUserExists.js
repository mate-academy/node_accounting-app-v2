const userRepository = require('../repositories/userRepository');

const verifyIfUserExists = (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (userId) {
    const userExist = userRepository.findByPk(Number(userId));

    if (!userExist) {
      return res.status(400).json({ error: 'User not found' });
    }

    return next();
  }

  const userExists = userRepository.findByPk(Number(id));

  if (!userExists) {
    return res.status(404).json({ error: 'User not found' });
  }

  return next();
};

module.exports = verifyIfUserExists;
