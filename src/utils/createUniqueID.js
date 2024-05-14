const createUniqueID = () => {
  return Math.floor(Math.random() * Date.now());
};

module.exports = { createUniqueID };
