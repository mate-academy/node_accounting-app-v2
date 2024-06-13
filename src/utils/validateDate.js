function validateDate(dateString) {
  return dateString === new Date(dateString).toISOString();
}

module.exports = {
  validateDate,
};
