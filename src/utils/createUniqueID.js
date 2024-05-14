const createUniqueID = () => {
  return Math.round(Math.random() * Date.now());
};

module.exports = { createUniqueID };
