const isValidISODate = (dateString) => {
  const regexISODate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

  return regexISODate.test(dateString);
};

module.exports = isValidISODate;
