function updateExpenseFunction(body, expenses, updateExpenseIndex) {
  for (const prop in body) {
    if (body[prop]) {
      expenses[updateExpenseIndex][prop] = body[prop];
    }
  }
}

module.exports = { updateExpenseFunction };
