const userRepository = require('../../repositories/userRepository');

class CreateUserService {
  execute(userData) {
    const user = userRepository.create(userData);

    return user;
  }
}

module.exports = CreateUserService;
