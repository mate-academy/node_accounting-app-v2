const _ = require('lodash');

function getTypeOfDatabaseItem (dbItem: {}): {type: string, isValid: boolean} {
  const keysOfUser = ['id', 'name'];
  const keysOfExpenses = ['id', 'userId', 'spentAt', 'title', 'amount', 'category', 'note'];
  const dbItemKeys = Object.keys(dbItem);

  switch (true) {
    case (_.isEqual(keysOfUser, dbItemKeys)):
      return {
        type: 'User',
        isValid: true,
      };

    case (_.isEqual(keysOfExpenses, dbItemKeys)):
      return {
        type: 'Expense',
        isValid: true,
      };

      default:
        return {
          type: typeof dbItem || 'Unknown',
          isValid: false,
        }
  }
}


module.exports = getTypeOfDatabaseItem;
