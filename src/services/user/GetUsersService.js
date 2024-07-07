const userRepository = require('../../repositories/userRepository');

class GetUserService {
  execute() {
    const users = userRepository.findAll();

    return users;
  }
}

module.exports = GetUserService;
