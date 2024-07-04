const { getAll } = require('../users.service/users.service');

const getUsers = (req, res) => {
  res.sendCode(200);
  res.send(getAll());
};

module.exports = {
  getUsers,
};
