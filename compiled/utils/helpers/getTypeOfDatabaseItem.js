import _ from 'lodash';
function getTypeOfDatabaseItem(dbItem) {
    const keysOfUser = ['name'];
    const keysOfExpenses = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];
    const dbItemKeys = Object.keys(dbItem);
    switch (true) {
        case (_.isEqual(keysOfUser, dbItemKeys)):
            return {
                type: 'User',
                correctDb: 'users',
                isValid: true,
            };
        case (_.isEqual(keysOfExpenses, dbItemKeys)):
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
            };
    }
}
export default getTypeOfDatabaseItem;
