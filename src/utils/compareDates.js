function compareDates(compareValue, eventDate, comparisonDate) {
  const normalizedEventDate = new Date(eventDate);
  const normalizedComparisonDate = new Date(comparisonDate);

  switch (compareValue) {
    case 'to':
      return normalizedComparisonDate < normalizedEventDate;

    case 'from':
      return normalizedComparisonDate > normalizedEventDate;
  }
}

module.exports = {
  compareDates,
};
