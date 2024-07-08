const userRepository = require('../../repositories/userRepository');

class GetAllUserService {
  execute() {
    const users = userRepository.findAll();

    return users;
  }
}

module.exports = GetAllUserService;
