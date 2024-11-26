const { v4: uuidv4 } = require('uuid');

const getNumberId = () => {
  return parseInt(uuidv4().split('-')[0], 16);
};

module.exports = {
  getNumberId,
};
