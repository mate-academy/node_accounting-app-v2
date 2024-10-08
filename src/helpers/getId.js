let nextId = 0;

const getId = () => {
  return ++nextId;
};

module.exports = {
  getId,
};
