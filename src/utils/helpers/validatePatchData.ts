function validatePatchData (dbItem: {}): {
  type: string,
  correctDb: string,
  isValid: boolean
} {
  const keysOfUser = ['name'];
  const keysOfExpenses = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];
  const dbItemKeys = Object.keys(dbItem);
  const isUserPatch = dbItemKeys.every(key => keysOfUser.includes(key));
  const isExpensePatch = dbItemKeys.every(key => keysOfExpenses.includes(key));

  switch (true) {
    case isUserPatch:
      return {
        type: 'User',
        correctDb: 'users',
        isValid: true,
      };

    case isExpensePatch:
      return {
        type: 'Expense',
        correctDb: 'expenses',
        isValid: true,
      };

      default:
        return {
          type: 'Unknown',
          correctDb: 'none',
          isValid: false,
        }
  }
}


export default validatePatchData;
