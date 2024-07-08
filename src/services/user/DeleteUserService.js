const userRepository = require('../../repositories/userRepository');

class DeleteUserService {
  execute(userId) {
    const user = userRepository.destroy(userId);

    return user;
  }
}

module.exports = DeleteUserService;