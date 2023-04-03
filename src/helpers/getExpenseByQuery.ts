import { Expense } from '../utils/types/ExpenseType';
import { QueryType } from '../utils/types/QueryType';

function getExpenseByQuery(
  expenses: Expense[],
  query: Partial<QueryType>
) {
  let filteredExpenses = expenses;

  for (const key in query) {
    switch(key) {
      case 'categories':
        filteredExpenses = filteredExpenses
          .filter(item => item.category === query['categories']);
        break;

      case 'from':
        filteredExpenses = filteredExpenses
          .filter(item => {
            const spentAt = new Date(item.spentAt);
            const fromDate = new Date(query.from as string);

            return spentAt >= fromDate;
          });
        break;

      case 'to':
        filteredExpenses = filteredExpenses
          .filter(item => {
            const spentAt = new Date(item.spentAt);
            const toDate = new Date(query.to as string);

            return spentAt <= toDate;
          });
        break;

      default:
        break;
      }
    }

    return filteredExpenses;
}

export default getExpenseByQuery;
