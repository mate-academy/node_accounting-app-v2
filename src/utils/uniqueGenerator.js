let currentId = 0;

const generateUniqueId = () => {
  currentId += 1;

  return currentId;
};

module.exports = {
  generateUniqueId,
};
