import ExpensesOutput from '../components/Output/ExpensesOutput';
import { ExpensesContext} from '../store/expenses-context';
import { useContext } from 'react';

function AllExpenses() {
   const expensesCtx = useContext(ExpensesContext);

   return (
   <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total' fallbackText='No expenses registered found!!!!' />);
}

export default AllExpenses;