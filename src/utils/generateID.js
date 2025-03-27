function generateID() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

module.exports = {
  generateID,
};
