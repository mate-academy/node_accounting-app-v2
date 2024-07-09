const userRepository = require('../../repositories/userRepository');

class GetUserService {
  execute(userId) {
    const user = userRepository.findByPk(userId);

    return user;
  }
}

module.exports = GetUserService;
