const getNewId = (arr) => {
  // finds biggest id in array and adds 1
  return (
    arr.reduce((acc, val) => {
      return val.id > acc ? val.id : acc;
    }, 0) + 1
  );
};

module.exports = {
  getNewId,
};
