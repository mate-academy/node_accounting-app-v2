export function updateExpenseFunction(body, expense, updateExpenseIndex) {
  for (const prop in body) {
    console.log(prop);

    expense[updateExpenseIndex][prop] =
      body[prop] || expense[updateExpenseIndex][prop];
  }
}

export const functions = { updateExpenseFunction };

// export default updateExpenseFunction;
