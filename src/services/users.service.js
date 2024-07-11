const AbstractService = require('./abstract.service');

class UserService extends AbstractService {
  constructor() {
    if (!UserService.instance) {
      super();
      UserService.instance = this;
    }

    return UserService.instance;
  }

  parseCreateData(body) {
    const errors = [];
    const { name } = body;

    if (!name || name.trim().length === 0) {
      errors.push('Name is required');
    }

    const data = {
      name,
    };

    return {
      errors,
      data,
    };
  }

  parseUpdateData(body) {
    return this.parseCreateData(body);
  }
}

module.exports = UserService;
