function generateUniqueId() {
  return Date.now() * 1000 + Math.floor(Math.random() * 1000);
}

module.exports = {
  generateUniqueId,
};
