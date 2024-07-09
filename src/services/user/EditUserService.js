const userRepository = require('../../repositories/userRepository');

class EditUserService {
  execute(userId, userData) {
    const user = userRepository.update(userId, userData);

    return user;
  }
}

module.exports = EditUserService;
