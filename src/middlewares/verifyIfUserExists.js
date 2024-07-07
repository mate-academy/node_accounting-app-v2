const userRepository = require('../repositories/userRepository');

const verifyIfUserExists = (req, res, next) => {
  const {id} = req.params;

  const userExists = userRepository.findAll().find(user => user.id === Number(id));

  if (!userExists) {
    return res.status(404).json({error: 'User not found'});
  }

  return next();
}

module.exports = verifyIfUserExists;