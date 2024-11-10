let maxNum = 1000;

function generateId() {
  maxNum++;

  return maxNum;
}

module.exports = {
  generateId,
};
