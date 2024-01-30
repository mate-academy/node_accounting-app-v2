const userService = require("../services/userServices");

const getUsers = (req, res) => {
  res.send(userService.getAll());
}

module.exports= {getUsers};
